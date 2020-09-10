const Database = require('./db') //./ significa que ai manter na pasta local
const createProffy = require ('./createProffy')


Database.then(async (db) => {
    // Inserir dados
    proffyValue = {
    name:" João Victor", 
    avatar:" https://avatars1.githubusercontent.com/u/50711561?s=460&u=40b558b7025dedd08f9b7a49bc24816bc50d6718&v=4 ", 
    whatsapp:"8180028922", 
    bio:"CTO na SoftMarker, namorado fiel e Mono Hecarim Fliperama nas horas vagas Trollando sua Ranked", 
    }

    classValue = {
    subject:"1", 
    cost:"100", 
    // o proffy id vira pelo banco de dados
    }
    
    classScheduleValues = [
        // class_id vira pelo banco de dados, após cadastramos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        },
    ]

        //await createProffy(db, {proffyValue, classValue, classScheduleValues})
    
        //Consultar os dados inseridos

        // todos os proffys
        const selectedproffys = await db.all("SELECT * FROM proffys")
        //console.log(selectedproffys)

        // consultar as classes de um determinado professor
        // e trazer junto os dados do professor
        const selectClassesAndProffys = await db.all(`
           SELECT classes.*, proffys.*
           FROM proffys
           JOIN classes ON (classes.proffy_id = proffys.id)
           WHERE classes.proffy_id = 5;        
        `)
        //console.log(selectClassesAndProffys)

        //  o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
        // o horário do time_from (8h) precisa ser antes ou igual ao horário solicitado
        // o time_to precisa ser acima
        const selectClassesSchedules =  await db.all(`
          SELECT class_schedule.*
          FROM class_schedule
          WHERE class_schedule.class_id = "1"
          AND class_schedule.weekday = "0"
          AND class_schedule.time_from <= "1320"
          AND class_schedule.time_to > "1320"        
        `)
        //console.log(selectClassesSchedules)
       
    })