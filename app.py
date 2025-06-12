from flask import Flask, request, session, g, redirect, url_for, render_template, flash 
import sqlite3, os

app = Flask(__name__) 