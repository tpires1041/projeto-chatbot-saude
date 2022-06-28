const TelegramBot = require('node-telegram-bot-api');
const telegran = require('../config/tokens')
const schedule = require('node-schedule');
const { Agendamento, Paciente, Esf } = require('../app/models');
const moment = require('moment').locale('pt-br');;
const { Op } = require('sequelize');
const bot = new TelegramBot(telegran.token, {polling: false});

schedule.scheduleJob('* * */12 * *', async () => {
  const data_final = moment(new Date()).add(2, 'd').format('YYYY/MM/DD');
  const data_inicial = moment(new Date()).format('YYYY/MM/DD');

  var agendamentos = await Agendamento.findAll({
    include: [
        { model: Paciente, as: 'paciente', 
            include: {
                model: Esf, as: 'esf'  
            } 
        }
    ],
    where: {
      data_agendamento: {
        [Op.between] : [data_inicial, data_final]
      },
    },
  });

  agendamentos.forEach(agenda => {
    let paciente = agenda.paciente
    bot.sendMessage(paciente.telegran_id, `Olá, ${paciente.name}, seu exame está chegando perto, ele está agendado para ${moment(agenda.data_agendamento).format('LLL')} na ${paciente.esf.name}. \n\n Aguardamos sua presença 😘`); 
  });
});