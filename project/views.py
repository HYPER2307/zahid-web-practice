from django.shortcuts import render 
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from sw_cart.utils import get_cart
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.http import JsonResponse
from django.db.models import Max, Min
from sw_utils.utils import paginate
from project.models import (
    Banner,
    BigBanner,
    ConsultationContact,
    AddresContactForm
    )

from sw_catalog.models import (
    Item,
    ItemFeature, 
    Feature,
    )

from sw_cart.models import (
    CartItem,
    FavourItem
 )

from sw_order.models import(
    Order,
)

from sw_catalog.models.category import(
    ItemCategory
)


def filter_items(request, items):
    feature_ids = []
    feature_value_ids = []
    for key in request.GET.keys():
        if key.startswith('feature_id_'):
            feature_ids.append(key.replace('feature_id_', ''))

        values = request.GET[key]
        if values.startswith('feature_value_id_'):
            values = values.replace('feature_value_id_', '')
            if ',' in values:
                for value in values.split(','):
                    feature_value_ids.append(int(value.strip()))
            else:
                feature_value_ids.append(int(values))

    if feature_value_ids:
        items = items.filter(
            id__in=ItemFeature.objects.filter(
                name__id__in=feature_ids,
                value__id__in=feature_value_ids
            ).values_list('item__id', flat=True)
        )

    return {
        "items": items,
        "feature_value_ids": feature_value_ids,
    }

def build_url(request):
    href_url = ''
    hardcoded_key = [
        'page_number',
        'ordering',
        'prioritet',
        'max_price',
        'min_price',
    ]
    for key, value in request.GET.items():
        if key not in hardcoded_key:
            href_url += f'{key}={value}&'
    page_number = request.GET.get('page_number')
    ordering = request.GET.get('ordering')
    prioritet = request.GET.get('prioritet')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    href_url += f'page_number={page_number}&'
    href_url += f'ordering={ordering}&'
    href_url += f'prioritet={prioritet}&'
    href_url += f'price={min_price},{max_price}&'
    return href_url


def build_ordering(request):
    ordering = request.GET.get('ordering', 'price')
    prioritet = request.GET.get('prioritet', 'up')
    if prioritet == 'up':
        ordering = f'{ordering}'
    elif prioritet == 'down':
        ordering = f'-{ordering}'
    else:
        raise('Неваліднний пріорітет.')
    return ordering


from project import ItemPriceType
from django.db.models import Case, DecimalField, When, Value, FloatField


def shop(request, slug=None):
    items = Item.objects.all().order_by(build_ordering(request))
    if slug:
        category = get_object_or_404(ItemCategory, slug=slug)
        ids = [category.id]
        for c1 in category.get_active_categories():
            ids.append(c1.id)
            for c2 in c1.get_active_categories():
                ids.append(c2.id)
        items = items.filter(category__in=ids)
    else:
        category = None
    features = Feature.objects.filter(
        id__in=ItemFeature.objects.filter(
            item__id__in=items.values_list('id', flat=True),
        ).values_list('name__id', flat=True),
    )
    # raw_min_price = items.filter(
    #     is_active=True, 
    #     price_type=ItemPriceType.PRICE_WITH_DISCOUNT).annotate(
    # discount_price=Case(
    #     When(price_type=ItemPriceType.PRICE_WITH_DISCOUNT, then='price'),
    #     output_field=FloatField()
    # )).aggregate(min_price=Min('price'))
    # print(raw_min_price)
    raw_max_price    = items.aggregate(Max('price'))
    raw_min_price = items.annotate(
    min_price=Case(
        When(price_type=ItemPriceType.PRICE, then='price'),
        When(price_type=ItemPriceType.PRICE_WITH_DISCOUNT,then='price'),
        default=Value(0),
        output_field=FloatField()
    )
).aggregate(min_price=Min('price'))
    print(raw_min_price)
    max_price        = str(raw_max_price.get('price__max')).replace(',', '.')
    min_price        = str(raw_min_price.get('price__min')).replace(',', '.')
    user_max_price = request.GET.get("max_price", max_price)
    user_min_price = request.GET.get("min_price", min_price)
    price = request.GET.get('price','')
    filtering_result = filter_items(request, items)
    items = filtering_result['items']
    if request.GET.get('price') is not None:
        user_min_price, user_max_price = price.split(',')   
        if user_max_price:
            items = items.filter(price__lte=user_max_price)
        if user_min_price:
            items = items.filter(price__gte=user_min_price)
    paginated_data = paginate(
            request,
            items,
            page_number=request.GET.get('page_number', 1),
            per_page=request.GET.get('per_page', 50),
        )
    items_count = items.count()
    category_id=category.id if slug else None
    context = {}
    context['category_id'] = category_id
    context['user_max_price'] = user_max_price
    context['user_min_price'] = user_min_price
    context['max_price'] = max_price
    context['min_price'] = min_price
    context['price'] = price
    context['items'] = items
    context['features'] = features
    context['paginated_data'] = paginated_data
    context['items_count'] = items_count
    context['category'] = category
    return render(request, 'project/shop.html', context)

def index(request):
    main_stock_items = Item.objects.filter(is_main_stock=True)
    new_items = Item.objects.filter(is_new_item=True)
    context = {}
    context['main_stock_items'] = main_stock_items
    context['new_items'] = new_items
    return render(request, 'project/index.html', context)


def products(request):
    banners = Banner.objects.all()
    big_banners = BigBanner.objects.all()
    stock_items = Item.objects.filter(is_stock=True)
    additional_items = Item.objects.filter(is_additional=True)
    context = {}
    context['banners'] = banners
    context['big_banners'] = big_banners
    context['stock_items'] = stock_items
    context['additional_items'] = additional_items
    return render(request, 'project/products.html', context)

def product(request, slug):
    item = get_object_or_404(Item, slug=slug)
    colors = item.colors.all()
    print(item.colors.all)
    item_features = ItemFeature.objects.filter(item=item)
    images = item.images.all()
    context = {}
    context['item'] = item
    context['colors'] = colors
    context['images'] = images
    context['item_features'] = item_features
    return render(request, 'project/product.html', context)

def about(request):
    context = {}
    return render(request, 'project/about-us.html', context)

from project import ItemPriceType
def basket(request):
    cart = get_cart(request)
    cart_items = CartItem.objects.filter(cart=cart)
    count = cart_items.count()
    
    context = {}
    context['ItemPriceType'] = ItemPriceType
    context['cart_items'] = cart_items
    context['cart'] = cart
    context['count'] = count

    return render(request, 'project/basket.html', context)

def cabinet(request):
    orders = Order.objects.filter(user=request.user)
    print(orders)
    context = {}
    context['orders'] = orders
    return render(request, 'project/cabinet.html', context)

def contacts(request):
    context = {}
    return render(request, 'project/contacts.html', context)

def favorites(request):
    cart=get_cart(request)
    favour_items = FavourItem.objects.filter(cart=cart)
    context = {}
    context['favour_items'] = favour_items 
    return render(request, 'project/favorites.html', context)

def main(request):
    context = {}
    return render(request, 'project/main.html', context)

def partnership(request):
    context = {}
    return render(request, 'project/partnership.html', context)

def thank_you(request):
    context = {}
    return render(request, 'project/thank_you.html', context)

@csrf_exempt
def consultation_contact_form(request):
    data = request.POST
    name    = data.get("name")
    comment = data.get("comment")
    phone = data.get("phone")
    email = data.get("email")
    ConsultationContact.objects.create(  
        name = name,
        comment = comment,
        phone = phone,
        email = email,
    )

    send_mail(
        subject        = 'Feedback form received',
        message        = render_to_string('project/consultation_contact_form.html', locals()),
        from_email     = settings.DEFAULT_FROM_EMAIL,
        recipient_list = settings.RECIPIENT_LIST,
        fail_silently  = False,
    )

    return JsonResponse({"status": "OK"}) 


@csrf_exempt
def addres_contact_form(request):
    data = request.POST
    name    = data.get("name")
    addres = data.get("addres")
    phone = data.get("phone")
    AddresContactForm.objects.create(  
        name = name,
        addres = addres,
        phone = phone,
    )

    send_mail(
        subject        = 'Feedback form received',
        message        = render_to_string('project/addres_contact.html', locals()),
        from_email     = settings.DEFAULT_FROM_EMAIL,
        recipient_list = settings.RECIPIENT_LIST,
        fail_silently  = False,
    )

    return JsonResponse({"status": "OK"}) 