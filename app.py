from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/academics.html')
def academics():
    return render_template('academics.html')

@app.route('/faq.html')
def faq():
    return render_template('faq.html')

@app.route('/student-life.html')
def student_life():
    return render_template('student-life.html')


if __name__ == '__main__':
    app.run() 