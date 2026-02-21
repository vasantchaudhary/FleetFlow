from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, render_template, request, redirect, flash
import sqlite3

app = Flask(__name__)
app.secret_key = "hackathon_secret"

# -------- DATABASE SETUP --------
def init_db():
    conn = sqlite3.connect('fleet.db')
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS vehicles (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    capacity INTEGER,
                    status TEXT
                )''')

    c.execute('''CREATE TABLE IF NOT EXISTS drivers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    status TEXT
                )''')

    c.execute('''CREATE TABLE IF NOT EXISTS fuel_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                vehicle_id INTEGER,
                liters INTEGER,
                cost INTEGER
            )''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
            )''')
    conn.commit()
    conn.close()

init_db()

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = sqlite3.connect('fleet.db')
        c = conn.cursor()

        try:
            c.execute("INSERT INTO users (username, password) VALUES (?, ?)",
                      (username, password))
            conn.commit()
            flash("Registration Successful!", "success")
            return redirect('/login')

        except:
            flash("Username already exists!", "danger")

        conn.close()

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        conn = sqlite3.connect('fleet.db')
        c = conn.cursor()

        c.execute("SELECT * FROM users WHERE username=? AND password=?",
                  (username, password))

        user = c.fetchone()
        conn.close()

        if user:
            flash("Login Successful!", "success")
            return redirect('/')
        else:
            flash("Invalid Credentials!", "danger")

    return render_template('login.html')


# -------- HOME --------
@app.route('/')
def index():
    conn = sqlite3.connect('fleet.db')
    c = conn.cursor()

    c.execute("SELECT * FROM vehicles")
    vehicles = c.fetchall()

    c.execute("SELECT * FROM drivers")
    drivers = c.fetchall()

    active_trips = len([v for v in vehicles if v[3] == "On Trip"])
    available_vehicles = len([v for v in vehicles if v[3] == "Available"])

    # ✅ ADD THIS HERE (inside function)
    c.execute("SELECT SUM(cost) FROM fuel_logs")
    total_fuel_cost = c.fetchone()[0] or 0

    conn.close()

    return render_template('index.html',
                           vehicles=vehicles,
                           drivers=drivers,
                           active_trips=active_trips,
                           available_vehicles=available_vehicles,
                           total_fuel_cost=total_fuel_cost)

# -------- ADD VEHICLE --------
@app.route('/add_vehicle', methods=['POST'])
def add_vehicle():
    name = request.form['name']
    capacity = request.form['capacity']

    conn = sqlite3.connect('fleet.db')
    c = conn.cursor()
    c.execute("INSERT INTO vehicles (name, capacity, status) VALUES (?, ?, ?)",
              (name, capacity, "Available"))
    conn.commit()
    conn.close()

    flash("Vehicle Added Successfully!", "success")
    return redirect('/')


# -------- ADD DRIVER --------
@app.route('/add_driver', methods=['POST'])
def add_driver():
    name = request.form['name']

    conn = sqlite3.connect('fleet.db')
    c = conn.cursor()
    c.execute("INSERT INTO drivers (name, status) VALUES (?, ?)",
              (name, "Available"))
    conn.commit()
    conn.close()

    flash("Driver Added Successfully!", "success")
    return redirect('/')


# -------- CREATE TRIP --------
@app.route('/create_trip', methods=['POST'])
def create_trip():
    vehicle_id = request.form['vehicle_id']
    driver_id = request.form['driver_id']
    cargo_weight = int(request.form['cargo'])

    conn = sqlite3.connect('fleet.db')
    c = conn.cursor()

    c.execute("SELECT capacity, status FROM vehicles WHERE id=?", (vehicle_id,))
    vehicle = c.fetchone()

    c.execute("SELECT status FROM drivers WHERE id=?", (driver_id,))
    driver = c.fetchone()

    if vehicle[1] != "Available":
        flash("Vehicle not available!", "danger")
        return redirect('/')

    if driver[0] != "Available":
        flash("Driver not available!", "danger")
        return redirect('/')

    if cargo_weight > vehicle[0]:
        flash("Cargo exceeds vehicle capacity!", "danger")
        return redirect('/')

    c.execute("UPDATE vehicles SET status=? WHERE id=?", ("On Trip", vehicle_id))
    c.execute("UPDATE drivers SET status=? WHERE id=?", ("On Trip", driver_id))

    conn.commit()
    conn.close()

    flash("Trip Created Successfully!", "success")
    return redirect('/')


# -------- COMPLETE TRIP --------
@app.route('/complete_trip/<int:vehicle_id>')
def complete_trip(vehicle_id):
    conn = sqlite3.connect('fleet.db')
    c = conn.cursor()

    c.execute("UPDATE vehicles SET status='Available' WHERE id=?", (vehicle_id,))
    c.execute("UPDATE drivers SET status='Available' WHERE status='On Trip'")

    conn.commit()
    conn.close()

    flash("Trip Completed!", "success")
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)

@app.route('/maintenance/<int:vehicle_id>')
def maintenance(vehicle_id):
    conn = sqlite3.connect('fleet.db')
    c = conn.cursor()

    c.execute("UPDATE vehicles SET status='In Shop' WHERE id=?", (vehicle_id,))
    conn.commit()
    conn.close()

    flash("Vehicle moved to Maintenance!", "warning")
    return redirect('/') 

@app.route('/add_fuel', methods=['POST'])
def add_fuel():
    vehicle_id = request.form['vehicle_id']
    liters = request.form['liters']
    cost = request.form['cost']

    conn = sqlite3.connect('fleet.db')
    c = conn.cursor()

    c.execute("INSERT INTO fuel_logs (vehicle_id, liters, cost) VALUES (?, ?, ?)",
              (vehicle_id, liters, cost))

    conn.commit()
    conn.close()

    flash("Fuel log added successfully!", "success")
    return redirect('/')