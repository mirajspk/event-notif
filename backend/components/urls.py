# Here we will define the URL pattern for Our App
from django.urls import path
from .import views
app_name = 'components'
urlpatterns = [
    # Home Page
    path('', views.home , name = 'home'),
    path('events/', views.events, name= 'events'),
    path('about/', views.about, name= 'about'),
    path('clubs/',views.clubs, name= 'clubs'),
    path('contact',views.contact, name = 'contact')
]