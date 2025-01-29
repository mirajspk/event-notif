from rest_framework import serializers 
from .models import Event, Clubs, Subscriber, User, EventRegistration


class EventSerializer(serializers.ModelSerializer):
    host_details = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['name', 'location', 'host', 'type', 'date',
                  'description', 'registration_link', 'created_by', 'host_details']

    def get_host_details(self, obj):
        return {
            'name': obj.host.club_name,
            'logo_url': obj.host.logo_url
        }


class ClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = '__all__'


class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = '__all__'


class SubscribeSerializer(serializers.ModelSerializer):
    clubs = serializers.PrimaryKeyRelatedField(
        queryset=Clubs.objects.all(),
        many = True,
        required = True
    )
    class Meta:
        model = Subscriber
        fields = ['email', 'clubs']
