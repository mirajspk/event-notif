from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Clubs, Subscriber, Event, EventRegistration

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'club_name', 'is_club_admin']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class EventSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # ✅ Use ImageField for proper URL handling
    host = serializers.PrimaryKeyRelatedField(queryset=Clubs.objects.all())  

    class Meta:
        model = Event
        # fields = ['name', 'location', 'host', 'type', 'date',
        #           'description', 'registration_link', 'created_by', 'host_details']
        fields = '__all__'

    def get_host_details(self, obj):
        host_name = dict(Event.CLUB_CHOICES).get(obj.host, 'Unknown Host')
        return {
            'name': host_name
        }

class ClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = '__all__'


class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = '__all__'


class SubscriberSerializer(serializers.ModelSerializer):
    clubs = serializers.PrimaryKeyRelatedField(
        queryset=Clubs.objects.all(),
        many = True,
        required = True
    )
    class Meta:
        model = Subscriber
        fields = ['email', 'clubs']
