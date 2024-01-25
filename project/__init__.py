from django.utils.translation import ugettext_lazy as _
from django.db import models
from enum import Enum
class ItemPriceType(models.TextChoices):
    PRICE = 'price'
    PRICE_WITH_DISCOUNT = 'price_with_discount'
    PRICE_WITH_COUPONS = 'price_with_coupons'
    PRICE_WITH_COUPONS_WITH_DISCOUNT = 'price_with_coupons_with_discount'
