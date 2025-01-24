from django.db.models.expressions import fields
from rest_framework import serializers # type: ignore
from .models import Event, Clubs, User, EventRegistration
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model


User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'user_type')
        extra_kwargs ={'password': {'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=validated_data['user_type']
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_type'] = self.user.user_type
        data['username'] = self.user.username
        return data


class EventSerializer(serializers.ModelSerializer):
    formatted_time = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()
    host_details = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'name', 'location', 'formatted_time', 'formatted_date', 
                 'host', 'description', 'registration_link', 'host_details']

    def get_formatted_time(self, obj):
        return obj.get_formatted_time()

    def get_formatted_date(self, obj):
        return obj.get_formatted_date()

    def get_host_details(self, obj):
        return {
            'name': obj.host,
            'logo_url': f'/static/club_logos/{obj.host.lower().replace(" ", "_")}.png'
        }


class ClubsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'user_type')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=validated_data.get('user_type', 'PARTICIPANT')
        )
        return user


class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = '__all__'
