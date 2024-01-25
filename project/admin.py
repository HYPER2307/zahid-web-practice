from typing import Text
from django.contrib import admin
from . import models
from django import forms


from project.models import(
    Banner,
    BigBanner,
    ProjectUser,
    FooterPhone,
    FooterAddres,
    ConsultationContact,
    AddresContactForm,

)




@admin.register(FooterPhone)
class FooterPhoneAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',
        'phone'
    ]
    list_editable = [
        'name',
        'phone'
    ]


@admin.register(FooterAddres)
class FooterAddresAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name'
    ]
    list_editable = [
        'name'
    ]
    
@admin.register(ProjectUser)
class ProjectUserAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'phone',
    ]
   

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'title',
        'brand',
        'price',
        'price_with_discount',
        'item_link',
        'image',
    ]
    list_editable = [
        'title',
        'brand',
        'price',
        'price_with_discount',
        'item_link',
        'image',
    ]

@admin.register(BigBanner)
class BigBannerAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'title',
        'item_description',
        'brand',
        # 'price',
        # 'price_with_discount',
        'item_link',
        'image',
    ]
    list_editable = [
        'title',
        'item_description',
        'brand',
        # 'price',
        # 'price_with_discount',
        'item_link',
        'image',
    ]


@admin.register(ConsultationContact)
class ConsultationContact(admin.ModelAdmin):
      list_display = [
        'id',
        'name',
        'phone',
        'email',
        'comment',
   
      ]


@admin.register(AddresContactForm)
class AddresContactForm(admin.ModelAdmin):
      list_display = [
        'id',
        'name',
        'phone',
        'addres',
      ]



from django.contrib.redirects.models import Redirect
from django.contrib.flatpages.models import FlatPage
from django.contrib.sites.models import Site
from allauth.socialaccount.models import SocialAccount, SocialApp, SocialToken, EmailAddress
from rest_framework.authtoken.models import Token, TokenProxy
from django.contrib.auth.models import User, Group
admin.site.unregister(Redirect)
# admin.site.unregister(Coupon)
admin.site.unregister(FlatPage)
admin.site.unregister(Site)
admin.site.unregister(SocialAccount)
admin.site.unregister(SocialApp)
admin.site.unregister(SocialToken)
admin.site.unregister(EmailAddress)
admin.site.unregister(Group)
admin.site.unregister(TokenProxy)
