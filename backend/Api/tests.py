from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Subscriber, Event, Clubs, User, EventRegistration


class EventTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.club = Clubs.objects.create(club_name="Coding Club", club_description="Learn to code!")
        self.admin_user = User.objects.create_user(
            username="admin",
            email="admin@example.com",
            password="admin123",
            user_type="ADMIN",
            club=self.club
        )
        self.event_data = {
            "name": "Python Workshop",
            "location": "Room 101",
            "date": "2023-12-15",
            "host": self.club.id,
            "type": "Event",
            "registration_link": "https://example.com/register",
            "description": "Learn Python in 2 hours!"
        }

        self.event_data['host'] = self.club

    def test_event_creation(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse('event-list')  # Adjust as per your URL config


        event_data = {
            'name': 'Test Event',
            'date': '2025-02-01',
            'location': 'Test Location',
            'description': 'Test Description',
            'host': self.club.id,  # Passing the club instance ID or use the instance directly
            'type': 'Event',
            'registration_link': 'https://example.com/register',
        }

        response = self.client.post(url, event_data, format='json')
        print(response.data)  # Debug response to see what's wrong
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

   def test_event_deletion(self):
        self.client.force_authenticate(user=self.admin_user)
        event = Event.objects.create(**self.event_data, created_by=self.admin_user)
        url = reverse('event-detail', args=[event.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
