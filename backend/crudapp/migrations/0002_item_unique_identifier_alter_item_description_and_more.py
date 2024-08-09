# Generated by Django 5.0.7 on 2024-07-11 19:12

import crudapp.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crudapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='unique_identifier',
            field=models.CharField(blank=True, max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='description',
            field=models.TextField(validators=[crudapp.models.validate_description_length]),
        ),
        migrations.AlterField(
            model_name='item',
            name='name',
            field=models.CharField(max_length=100, validators=[crudapp.models.validate_name_length]),
        ),
    ]
