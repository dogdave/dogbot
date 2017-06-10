/**
 * Created by Dave on 6/9/2017.
 */
'use strict';

var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');
var API_Keys = require('./node_modules/API_Access.js');

var CLIENT_ID = API_Keys.Google.ClientID;
var CLIENT_SECRET = API_Keys.Google.Client_Secret;
var REDIRECT_URL = API_Keys.Google.Redirect_URL;

// https://developers.google.com/identity/protocols/OAuth2ServiceAccount
