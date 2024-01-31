require('dotenv/config');


const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSSequelize = require('@adminjs/sequelize')
const options = require('./config/options.js');
AdminJS.registerAdapter(AdminJSSequelize);
const { Usuario } = require('./app/models');
const bcrypt = require('bcryptjs');
import { ComponentLoader } from 'adminjs'

const componentLoader = new ComponentLoader()

const Components = {
  Dashboard: componentLoader.add('Dashboard', './dashboard'),
  // other custom components
}

const admin = new AdminJS({
  dashboard: {
    component: Components.Dashboard,
  },
  componentLoader
})

const adminJs = new AdminJS(options)
