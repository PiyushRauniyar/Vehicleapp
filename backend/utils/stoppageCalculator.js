const readXlsxFile = require('read-excel-file/node');
const path = require('path');

const filePath = path.join(__dirname, '../data/gpsdata.xlsx');

const calculateStoppages = async (threshold) => {
  const rows = await readXlsxFile(filePath);
  console.log('Read rows from Excel:', rows); 

  const stoppages = [];
  let inStoppage = false;
  let start = null;
  let lastValidRow = null;

  for (let i = 1; i < rows.length; i++) {
    const [equipmentId, latitude, longitude, speed, odometer, eventDate, eventGeneratedTime] = rows[i];
    const date = new Date(eventGeneratedTime);

    console.log(`Processing row ${i}:`, { latitude, longitude, speed, odometer, eventGeneratedTime });

    if (speed === 0 || (lastValidRow && odometer === lastValidRow.odometer)) {
      if (!inStoppage) {
        start = date;
        inStoppage = true;
        lastValidRow = { latitude, longitude, date, odometer };
      }
    } else {
      if (inStoppage) {
        const duration = (date - start) / 60000; 
        if (duration >= threshold) {
          stoppages.push({
            latitude: lastValidRow.latitude,
            longitude: lastValidRow.longitude,
            reachTime: start,
            endTime: date,
            duration,
          });
          console.log(`Added stoppage:`, stoppages[stoppages.length - 1]);
        }
        inStoppage = false;
      }
    }
  }

  
  if (inStoppage) {
    const lastRow = rows[rows.length - 1];
    const endTime = new Date(lastRow[6]);
    const duration = (endTime - start) / 60000;
    if (duration >= threshold) {
      stoppages.push({
        latitude: lastValidRow.latitude,
        longitude: lastValidRow.longitude,
        reachTime: start,
        endTime,
        duration,
      });
      console.log(`Added final stoppage:`, stoppages[stoppages.length - 1]);
    }
  }

  console.log('Calculated stoppages:', stoppages); 
  return stoppages;
};

module.exports = { calculateStoppages };
