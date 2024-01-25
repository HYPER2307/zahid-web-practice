from pkg_resources import parse_requirements
from sw_catalog.models import (
    Item, 
    ItemCategory, 
    ItemFeature,
    Feature, 
    ItemReview
    )
from sw_cart.utils import get_cart
from sw_cart.models import (
    CartItem,
    FavourItem
 )
from project.models import(
    FooterPhone,
    FooterAddres,
)

def context(request):
    cart = get_cart(request)
    cart_total_amount = cart.items_quantity
    cart_items = CartItem.objects.filter(cart=cart)
    favour_items = FavourItem.objects.filter(cart=cart)
    categories = ItemCategory.objects.all()
    parent_categories = ItemCategory.objects.filter(is_active=True,parent__isnull=True).order_by('id')
    item_ids  = FavourItem.objects.filter(cart=cart).values_list('item__id', flat=True)
    favours = Item.objects.filter(id__in=item_ids)
    count = cart_items.count()
    favour_count = favour_items.count()
    phones = FooterPhone.objects.all()
    emails = FooterAddres.objects.all()
    context = {}
    context['parent_categories'] = parent_categories
    context['phones'] = phones
    context['emails'] = emails
    context['count'] = count
    context['favour_count'] = favour_count
    context['categories'] = categories
    context['favours'] = favours
    return context