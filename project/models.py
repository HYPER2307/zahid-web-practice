from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields.files import ImageField
from django.urls import reverse
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator
from tinymce.models import HTMLField
from django.contrib.auth.models import AbstractUser
from django.urls import reverse
from sw_catalog.models import *
from django.utils import timezone 
from django.core.validators import ValidationError 

class ProjectUser(AbstractUser):
    phone = models.CharField(verbose_name="Телефон", max_length=255, blank=True, null=True)
    name = models.CharField(verbose_name='Імя', max_length=255, blank=True, null=True)
    surname = models.CharField(verbose_name='Фамілія', max_length=255, blank=True, null=True)
    adress = models.CharField(verbose_name="Адреса", max_length=255, blank=True, null=True)
    class Meta:
        verbose_name = 'Користувач'
        verbose_name_plural = 'Користувачі'


class Banner(models.Model):
    title = models.CharField(verbose_name="Заголовок", max_length=255)
    brand = models.CharField(verbose_name="Заголовок", max_length=255)
    price = models.FloatField(verbose_name='Ціна', max_length=255)
    price_with_discount = models.FloatField(verbose_name='Ціна з знижкою', max_length=255)
    item_link = models.URLField(verbose_name='Посилання')
    image = models.ImageField(verbose_name='Фото', max_length=255)

    def __str__(self):
        return f'{self.title}'
    class Meta:
        verbose_name = 'Баннер'
        verbose_name_plural = 'Баннери'
    
    # def save(self, *args, **kwargs):
    #     if Banner.objects.all().count() == 2:
    #         raise ValidationError('Не можливо добавити більше 2 баннерів')
    #     super().save(*args, **kwargs)

                                
                                  

        


class BigBanner(models.Model):
    title = models.CharField(verbose_name="Заголовок", max_length=255)
    item_description = models.TextField(verbose_name="Опис")
    brand = models.CharField(verbose_name="Заголовок", max_length=255)
    # price = models.FloatField(verbose_name='Ціна', max_length=255)
    # price_with_discount = models.FloatField(verbose_name='Ціна з знижкою', max_length=255)
    item_link = models.URLField(verbose_name='Посилання')
    image = models.ImageField(verbose_name='Фото', max_length=255)

    def __str__(self):
        return f'{self.title}'
    class Meta:
        verbose_name = 'Великий баннер'
        verbose_name_plural = 'Великі баннера'

class ConsultationContact(models.Model):
    name = models.CharField(verbose_name="Ім'я", max_length=150, blank=True, null=True)
    phone = models.CharField(verbose_name='Телефон', max_length=150, blank=True, null=True)
    email = models.CharField(verbose_name='Емейл', max_length=150, blank=True, null=True)
    comment = models.TextField(verbose_name='Текст', blank=True, null=True)

    def __str__(self):
        return f'{self.name} {self.email}'

    class Meta:
        verbose_name = 'Контактна форма з сторінки контакти'
        verbose_name_plural = 'Контактні форми з сторінки контакти'

class AddresContactForm(models.Model):
    name = models.CharField(verbose_name="Ім'я", max_length=150, blank=True, null=True)
    phone = models.CharField(verbose_name='Телефон', max_length=150, blank=True, null=True)
    addres = models.CharField(verbose_name='Місто', max_length=150, blank=True, null=True)

    def __str__(self):
        return f'{self.name} {self.addres}'

    class Meta:
        verbose_name = 'Контактна форма з сторінки партнерство'
        verbose_name_plural = 'Контактні форми з сторінки партнерство'


class FooterPhone(models.Model):
    name = models.CharField(verbose_name='Імя', max_length=150, blank=True, null=True)
    phone = models.CharField(verbose_name='Телефон', max_length=150, blank=True, null=True)

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Телефон'    
        verbose_name_plural = 'Телефони'

class FooterAddres(models.Model):
    name = models.CharField(verbose_name="Адреса", max_length=150, blank=True, null=True)

    def __str__(self):
        return f'{self.name}'
    
    class Meta:
        verbose_name = 'Адреса'    
        verbose_name_plural = 'Адреси'