from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Clubs, Subscriber, Event, EventRegistration, User

admin.site.register(User, UserAdmin)
admin.site.register(Clubs)


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'subscribed_at')  
    search_fields = ('email',)  
    filter_horizontal = ('clubs',)  

admin.site.register(Event)
admin.site.register(EventRegistration)
