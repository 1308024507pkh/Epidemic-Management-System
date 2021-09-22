"""demo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url
from . import views,testdb,search,dbrequest
from django.views.static import serve
from django.conf import settings
from django.conf.urls.static import static
from g9 import views as g9_view

urlpatterns = [
    # ... the rest of your URLconf goes here ...
    path('ESS/transport/', include('transport.urls')),

    path('/ESS/write/', g9_view.updatePopulationFlow),
    path('/ESS/getPopulationFlow/', g9_view.sendPopulationFlow),
    path('/ESS/action/', g9_view.actionRelease),
    path('/ESS/getNews', g9_view.sendNews),

    path('index',dbrequest.hello),
    path('ESS/situation',dbrequest.rqst_process),
    path('ESS/situation$',dbrequest.rqst_process),
    path('ESS/situation/situationMoreInfo',dbrequest.rqst_process),
    path('ESS/situation/situationMoreInfo$',dbrequest.rqst_process),
    path('ESS/background/Cases',dbrequest.rqst_process),
    path('ESS/background/Cases$',dbrequest.rqst_process),
    #url(r'^(?P<path>.*)$', serve, {'document_root': ''}),
] #+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
