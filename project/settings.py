from pathlib import Path
import os
from sw_utils.default_settings import *
from decouple import config
from django.conf import settings
import os

#тут має бути sw_utelis urls
ROOT_URLCONF = 'sw_utils.urls'
BASE_DIR = Path(__file__).resolve().parent.parent
DEBUG = True

ALLOWED_HOSTS = ['*']
SECRET_KEY = config('SECRET_KEY')
AUTH_USER_MODEL = 'project.ProjectUser'

INSTALLED_APPS = [
    *priority_third_party,
    *django_contrib,
    *third_party,
    *box_core,
    *shop,
    'nova_poshta',
    'sw_liqpay',
    'project',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'project.context_proccesors.context',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.application'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

PROJECT_CORE_MULTILINGUAL_URLS = [
    'project.urls',
]

PROJECT_CORE_URLS = [
    'project.static_urls'
]





# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'zahid',
#         'USER' : 'zahid',
#         'PASSWORD' : 'zahid',
#         'HOST' : '127.0.0.1',
#         'PORT' : '5432',
#     }
# }



if config('DB_NAME') == 'sqlite3':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
    

elif config('DB_NAME') == 'pg':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'zahid_dah',
            'USER' : 'zahid_dah',
            'PASSWORD' : 'zahid_dah',
            'HOST' : '127.0.0.1',
            'PORT' : '5432',
        }
    }



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



LANGUAGE_CODE = 'uk'

TIME_ZONE = 'UTC'

USE_I18N = True
USE_L10N = True
USE_TZ = True

MEDIA_ROOT = os.path.join(BASE_DIR, 'media') 
MEDIA_URL = '/media/'
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static_root')
STATICFILES_DIRS = []
STATIC_URL = '/static/'


EMAIL_BACKEND          = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS          = True
EMAIL_USE_SSL          = False
EMAIL_PORT             = 587
EMAIL_HOST             = "smtp.gmail.com"
SERVER_EMAIL           = 'starway.notifier@gmail.com'
EMAIL_HOST_USER        = "starway.notifier@gmail.com"
EMAIL_HOST_PASSWORD    = "ipbqvhxkublskmkp"
DEFAULT_FROM_EMAIL     = EMAIL_HOST_USER
# RECIPIENT_LIST = ['starwaytester@gmail.com','atamed2018@gmail.com']
RECIPIENT_LIST = ['starwaytester@gmail.com']

DEFAULT_RECIPIENT_LIST = [
    'pashakhurtenko@gmail.com'

    
]