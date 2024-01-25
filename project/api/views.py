from django.http import JsonResponse, response
from sw_catalog.models import Item, ItemCategory, ItemFeature, Feature, ItemStock
from django.contrib.auth import (authenticate, get_user_model, login, logout)
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.urls import reverse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from django.db.models import Q
from django.utils.translation import gettext as _
import json
from project import ItemPriceType

def search_items(request):
    response = []
    query = request.GET or request.POST
    search_query = query.get('search_query')
    price_type = query.get('price_type', ItemPriceType.PRICE_WITH_DISCOUNT)  # додайте параметр ціни за замовчуванням
    items = Item.objects.all()
    items = items.filter(is_active=True)
    from django.db.models import Q
    if search_query:
        items = items.filter(
            Q(title__icontains=search_query),
            # Q(articul__icontains=search_query),
        )
    for item in items:
        discount = item.get_price(price_type=price_type)  
        json_item = {
            "id": item.id,
            "title": item.title,
            # "code": item.article,
            # "price": item.discount,
            "second_price": item.price,
            "discount":discount,
            "image": item.image.url,
            "url": item.get_absolute_url(),
            "currency": None,
            'in_stock':getattr(item.in_stock, 'availability', None),
                  }
        print(discount)
        if item.currency:
            currency = {
                "symbol": item.currency.symbol,
                "code": item.currency.code
            }
            json_item['currency'] = currency
        response.append(json_item)
    return JsonResponse(response, safe=False)

@csrf_exempt
@api_view(['GET', 'POST'])
def create_user(request, *args, **kwargs):
    query = request.data
    print(query)
    email = query['email']
    username = query.get('username') or email.split('@')[0]
    password = query['password']
    phone = query['phone']
    name = query['name']
    surname = query['surname']
    phone = query['phone']
    email_qs = get_user_model().objects.filter(email=email)
    username_qs = get_user_model().objects.filter(username=username)
    # phone_qs = get_user_model().objects.filter(phone=phone)

    if email_qs.exists() and email != '':
        return JsonResponse({
            'status': 'BAD',
            "error_fields": {
                "username":_('Цей email вже зайнятий'),
            },
        })
        
        
    # if phone_qs.exists() and phone != '':
    #     return JsonResponse({
    #         'status': 'BAD',
    #         "error_fields": {
    #             "username":_('Цей цей телефон вже зайнятий'),
    #         },
    #     })


    if username_qs.exists() and username != '':
        return JsonResponse({
            'status': 'BAD',
            "error_fields": {
                "username":_('Цей логін вже зайнятий'),
            },
        })
    
    user = get_user_model().objects.create_user(
        name=name,
        surname=surname,
        username=username,
        email=email,
        phone=phone,

    )
    user.set_password(password)
    user.is_active = True
    user.save()
    new_user = authenticate(username=user.username, password=password)
    login(request, user, backend='django.contrib.auth.backends.ModelBackend')
    url = reverse('cabinet')
    return JsonResponse({
        'status': 'OK',
        'url': url
    })




@api_view(['GET', 'POST'])
@csrf_exempt
def login_user(request):
    query = request.POST or request.GET
    # query = query.get('data')
    # query = json.loads(query)
    password = query['password']
    email = query['email']

    users = get_user_model().objects.filter(
        email__iexact=email
    ).distinct()

    # user = users.first()
    user = users.first()

    if users.exists() and not user.check_password(password):
        return JsonResponse({
            'error_fields': {
                'password':_('Неправильний пароль'),
            },
            'status':'BAD' ,
        })


    if not users.exists() and users.count() != 1:
        return JsonResponse({
            'error_fields': {
                'email':_('Такого користувача не існує'),
                'username': _('Такого користувача не існує'),
            },
            'status': 'BAD',
        })
  
    if not user.check_password(password):
        return JsonResponse({
            'error_fields': {
                'password':_('Неправильний пароль')
            }
        })
    if not user.is_active:
        return JsonResponse({
            'message':_('Цей користувач неактивний'),
            'status':'BAD',
        })


    

    # user.set_password(password)
    # user.is_active = True
    # user = authenticate(email=user.email, password=password)
    # login(request, user)
    # user.save()
    login(request, user, backend='django.contrib.auth.backends.ModelBackend')

    url = reverse('cabinet')
    return JsonResponse({
        'status': 'OK',
        'message':_('Ви увійшли'),
        'url': url,
    })
    

# from rest_framework.response import Response

@csrf_exempt
@api_view(['PATCH', 'POST'])
def update_user_profile(request, *args, **kwargs):
    user = request.user
    data = request.data
    # data = data.get('data')
    # data = json.loads(data)
    
    password     = data.get('password')
    password2    = data.get('password2')
    old_password = data.get('old_password')

    if password and password2 and password != password2:
        return JsonResponse({
            'status':'BAD',
            "error_fields":{
                "password":_('Паролі не співпадаюсь'),
                'password2':_('Паролі не співпадаюсь'),
            }
        })
    if old_password and not user.check_password(old_password):
        return JsonResponse({
            'error_fields':{
                'old_password':_('Неправильний старий пароль'),
            },
            'status':'BAD',
        })
    if password:
        user.set_password(password)
        user.save()
    name = data.get('name')
    surname = data.get('surname')
    phone = data.get('phone')
    email = data.get('email')
    adress = data.get('adress')


    if name:
        user.name = name    
    if surname:
        user.surname = surname
    if adress:
        user.adress = adress
    if phone:
        user.phone = phone
    if email:
        user.email = email
    user.save()
    # result = {'status': 'OK'}
    return JsonResponse({
        'status': 'OK',
        'message':_('Ви змінили свої особисті данні'),
     })

@csrf_exempt
def logout_view(request):
    logout(request)
    return redirect('index')