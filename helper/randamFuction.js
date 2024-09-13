export function generateReferralCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let code = "";

  // Generate the first 3 characters (capital letters)
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  // Generate a single number
  const randomNumber = Math.floor(Math.random() * numbers.length);
  code += numbers[randomNumber];

  // Generate a single character (capital letter)
  const randomChar = Math.floor(Math.random() * characters.length);
  code += characters[randomChar];
  // Generate a single number
  const randomNumber2 = Math.floor(Math.random() * numbers.length);
  code += numbers[randomNumber2];
  // Generate the final 3 characters (capital letters)
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

export function EpochTimeConverter(inputDate) {
  //const inputDate = "15/11/2023";

  // Split the date into day, month, and year
  const [day, month, year] = inputDate.split("/");

  // Create a new Date object using the parsed components
  // const dateObject = new Date(`${year}-${month}-${day}T00:00:00`);
  const paddedDate = new Date(
    `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00`
  );
  // Get the epoch time (UNIX timestamp)
  const epochTime = paddedDate.getTime();
  return Number(epochTime);
}

export function generateUniqueIdWithDate() {

  return `${Math.random().toString(36).substring(2,10)}${new Date().getTime()}`;

}