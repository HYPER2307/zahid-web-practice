from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from django.conf import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from project import views
from django.contrib.auth import logout
from django.http import HttpResponse
from django.contrib.sitemaps.views import sitemap


urlpatterns = [
    path('', views.index, name='index'),
    path('admin/', admin.site.urls),
    path('about/', views.about, name='about'),
    path('basket/', views.basket, name='basket'),
    path('cabinet/', views.cabinet, name='cabinet'),
    path('contacts/', views.contacts, name='contacts'),
    path('favorites/', views.favorites, name='favorites'),
    path('main/', views.main, name='main'),
    path('partnership/', views.partnership, name='partnership'),
    path('product/', views.product, name='product'),
    path('product/<slug>/', views.product, name='item'),
    path('shop/', views.shop, name='products'),
    path('shop/<slug>/', views.shop, name='item_category'),
    path('products/', views.products, name='shop'),
    path('consultation_contact_form/', views.consultation_contact_form, name='consultation_contact_form'),
    path('addres_contact_form/', views.addres_contact_form, name='addres_contact_form'),
    path('thank_you/', views.thank_you, name='thank_you'),
    path("api/", include("nova_poshta.api.urls")),
]

# if settings.DEBUG:
#     urlpatterns = [
        
#     ] + urlpatterns
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)