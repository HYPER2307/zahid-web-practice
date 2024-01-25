from django.urls import path
from project.api.views import (
    search_items,
    create_user,
    login_user,
    update_user_profile,
    logout_view,
)


urlpatterns = [
    path('api/search_items/', search_items, name='search_items'),
    path('api/create_user/', create_user, name='create_user'),
    path('api/login_user/', login_user, name='login_user'),
    path('api/update_user_profile/', update_user_profile, name='update_user_profile'),
    path('logout_view/', logout_view, name='logout_view'),
]