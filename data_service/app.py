from flask import Flask, request, render_template, redirect, url_for, jsonify
import jwt
import os
from database.db import get_db_connection
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Middleware: JWT Authentication
def authenticate(f):
    def wrapper(*args, **kwargs):
        token = request.cookies.get("auth_token")
        if not token:
            return redirect("http://localhost:5001/login")  # Redirect to auth_service login
        try:
            jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return redirect("http://localhost:5001/login")
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

# Serve the Data Form (Default Page)
@app.route("/")
@authenticate
def data_form():
    return render_template("data_form.html")

# Save Data to MySQL
@app.route("/save-data", methods=["POST"])
@authenticate
def save_data():
    name = request.form.get("name")
    age = request.form.get("age")
    wage = request.form.get("wage")

    if not name or not age or not wage:
        return jsonify({"message": "All fields are required!"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO user_data (name, age, wage) VALUES (%s, %s, %s)", (name, age, wage))
        conn.commit()
        cursor.close()
        conn.close()
        return render_template("data_form.html", message="Data Saved Successfully!")
    except Exception as e:
        return jsonify({"message": "Database error", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
