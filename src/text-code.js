import * as fs from 'fs';
import { watch } from 'fs'

watch('src/archive.txt', (eventType, filename) => {
  console.log(`event type is: ${eventType}`);
  
  if (filename) {
    console.log(`filename provided: ${filename}`);
  } else {
    console.log('filename not provided');
  }
});
export default watcher;