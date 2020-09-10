module.exports = async function(db, {proffyValue, classValue, classScheduleValues}) {
    //Inserir dados na table de proffys
    //await db.run() //await > esperar alguma coisa, funciona na função apenas com > async antes da função
    const insertedProffy = await db.run(`
         INSERT INTO proffys (
             name,
             avatar,
             whatsapp,
             bio
         ) VALUES (
           "${proffyValue.name}",
           "${proffyValue.avatar}",
           "${proffyValue.whatsapp}",
           "${proffyValue.bio}"
         );
    `)   

    const proffy_id = insertedProffy.lastID

    // inserir dados na tabela de classes
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
         ) VALUES (
             "${classValue.subject}",
             "${classValue.cost}",
             "${proffy_id}"
        );
    `)
   
    const class_id = insertedClass.lastID

    console.log(insertedProffy, insertedClass)

    // Inserir dados na tabela class_schedule
    const insertedAllClassScheduleValues = classScheduleValues.map(
        (classScheduleValue) => {
        return db.run(` 
             INSERT INTO class_schedule (
             class_id,
             weekday,
             time_from,
             time_to
             ) VALUES (
            "${class_id}",
            "${classScheduleValue.weekday}",
            "${classScheduleValue.time_from}",
            "${classScheduleValue.time_to}"
             );        
        `)
    })   

    

    // aqui vou executar todos os db.run() das class_schedules
const result = await Promise.all(insertedAllClassScheduleValues)

}