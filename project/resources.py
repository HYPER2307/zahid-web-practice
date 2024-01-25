from import_export.resources import ModelResource


from project.models import ( 
    Banner,
    BigBanner,
    
)

class BannerResource(ModelResource):
    class Meta:
        model = Banner
        exclude = []

class BigBannerResource(ModelResource):
    class Meta:
        model = BigBanner
        exclude = []
