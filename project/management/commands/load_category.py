from django.core.management.base import BaseCommand
from sw_catalog.models import (
  Item, ItemImage, ItemCategory, Attribute, AttributeValue, 
  ItemAttribute, ItemAttributeValue, Currency, FeatureValue, 
  Feature, ItemFeature, ItemStock, ItemManufacturer, ItemBrand
)
from itertools import zip_longest
from sw_global_config.models import GlobalMarker
import random
import csv
import os 
from PIL import Image 
import requests
from io import BytesIO
from sw_catalog.utils import item_image_folder
from django.core.management.base import BaseCommand
from sw_catalog.models import (
  Item, ItemImage, ItemCategory, Attribute, AttributeValue, ItemAttribute, ItemAttributeValue, Currency, FeatureValue, Feature, ItemFeature
)
from sw_global_config.models import GlobalMarker

from io import StringIO, BytesIO
import random
import csv




def read_category_from_csv(filename, *args, **kwargs):
  # ItemCategory.objects.all().delete()
  file = open(filename, encoding='utf-8')
  raw_dicts = csv.DictReader(file)
  mapped_dicts = map(dict, raw_dicts)
  for csv_row in mapped_dicts:
    category, _ = ItemCategory.objects.get_or_create(id=csv_row['id'])
    category.title = csv_row.get('name')
    category.title_uk = csv_row.get('name_uk')
    category.image = csv_row.get('image')
    print(category.title)
    if csv_row.get('code'):
      category.code = csv_row.get('code')
    try:
      parent = ItemCategory.objects.get(id=csv_row['parent_id'])
    except:
      parent=None
    category.parent=parent
    category.save()



class Command(BaseCommand):
  def handle(self, *args, **kwargs):
    filename = 'load_category.csv'
    read_category_from_csv(filename)
