import emailQueue from '../queue/email.js'
export default async function emailProducer({ to, subject, html }){
    try {
        console.log('inside producers');
        await emailQueue.add('emailJob', { to, subject, html });
        console.log('job added');
    } catch (error) {
        console.error('Error adding job to queue:', error);
    }
}