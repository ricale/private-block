source myvenv/bin/activate
pip install -r requirements.txt
npm install
webpack --config webpack.production.config.js
service apache2 restart