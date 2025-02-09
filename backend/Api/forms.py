# api/forms.py
from django import forms
from .models import Event

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = [
            "title", "location", "date", "host", "type",
            "registration_link", "startTime", "description", "image", "imageTwo"
        ]
        widgets = {
            "date": forms.DateInput(attrs={"type": "date"}),
            "startTime": forms.TextInput(attrs={"placeholder": "e.g., 15:12:00"}),
            "description": forms.Textarea(attrs={"rows": 4 ,"placeholder" : "Write the description of the event"}),
            "title" :forms.Textarea(attrs={"placeholder": "Enter event title" , "rows" :1}),
            "location" : forms.Textarea(attrs={"placeholder": "Enter Location", "rows":1 }),
            "registration_link" : forms.Textarea(attrs={"placeholder": "Enter Registration Link", "rows":1 })
        }
