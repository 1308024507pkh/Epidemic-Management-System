from django.urls import path

from . import views

app_name = 'transport'
urlpatterns = [
    path('search1/', views.search1, name='search1'),
    path('register/', views.register, name='register'),
    path('record/', views.record, name='record'),
    path('mail/', views.mail, name='mail'),
    path('delete/', views.delete, name='delete'),
    path('shifts/', views.shifts, name='shifts'),
]