# from django.db import models
# # from django.db import models

# class Item(models.Model):
#     name = models.CharField(max_length=100)
#     description = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name
# # Create your models here.

from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

def validate_name_length(value):
    if len(value) < 3:
        raise ValidationError(
            _('Name must be at least 3 characters long'),
        )

def validate_description_length(value):
    if len(value) < 10:
        raise ValidationError(
            _('Description must be at least 10 characters long'),
        )

class Item(models.Model):
    name = models.CharField(max_length=100, validators=[validate_name_length])
    description = models.TextField(validators=[validate_description_length])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name