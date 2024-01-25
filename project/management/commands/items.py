
from django.core.management.base import BaseCommand
from sw_catalog.models import (
  Item, ItemImage, ItemCategory, Attribute, AttributeValue, ItemAttribute, ItemAttributeValue, Currency, FeatureValue, Feature, ItemFeature
)
from sw_global_config.models import GlobalMarker
import random
import datetime 
import json 
import csv


class Command(BaseCommand):
  def handle(self, *args, **kwargs):
    Item.objects.all().delete()
    for i in range(30):
      
      item, _  = Item.objects.get_or_create(
        title=f'товар {i}',
        title_uk=f'товар {i}',
        code = f'code_{i}',
      )
      
      item.category = random.choice(ItemCategory.objects.all())
      item.currency = Currency.objects.get(code='UAH')
      for feature in range(1, 4):
          name = random.choice(Feature.objects.all())
          value = random.choice(FeatureValue.objects.all())
          item_feature, _ = ItemFeature.objects.get_or_create(
            item=item,
            name=name,
            value=value
          )
          item_feature.save()
      for i in range(4):
        item.similars.add(random.choice(Item.objects.all()))

      item.description = 'Тут буде опис товару'
      item.price = random.randint(100, 4000)
      item.discount = random.randint(10, 50)
      item.image = 'project/item_photo1.png'
      images = ['project/item_photo1.png', 'project/item_photo1.png']
      for image in images:
        ItemImage.objects.create(item=item, image=image)
      item.save()
      print(item)
      print(item.image)
      print()
      
      
