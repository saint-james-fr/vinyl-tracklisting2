export const sortArraysClosestSum = (arr1: TrackType[], arr2: TrackType[]) => {
  arr1.sort((a, b) => a.length - b.length); // Sort array 1 in ascending order
  arr2.sort((a, b) => a.length - b.length); // Sort array 2 in ascending order

  const mergedArray = [...arr1, ...arr2].sort((a, b) => b.length - a.length); // Merge and sort arrays in descending order

  let sum1 = 0;
  let sum2 = 0;
  const resultArr1: TrackType[] = [];
  const resultArr2: TrackType[] = [];

  for (let i = 0; i < mergedArray.length; i++) {
    if (sum1 <= sum2) {
      resultArr1.push(mergedArray[i]);
      sum1 += mergedArray[i].length;
    } else {
      resultArr2.push(mergedArray[i]);
      sum2 += mergedArray[i].length;
    }
  }

  // Function to calculate the absolute difference between two numbers
  const getAbsoluteDifference = (a: number, b: number) => Math.abs(a - b);

  let diff = getAbsoluteDifference(sum1, sum2);
  let swapped = true;

  while (swapped) {
    swapped = false;

    for (let i = 0; i < resultArr1.length; i++) {
      for (let j = 0; j < resultArr2.length; j++) {
        const newDiff = getAbsoluteDifference(
          sum1 - resultArr1[i].length + resultArr2[j].length,
          sum2 - resultArr2[j].length + resultArr1[i].length
        );

        if (newDiff < diff) {
          const temp1: TrackType = resultArr1[i];
          const temp2: TrackType = resultArr2[j];

          resultArr1[i] = temp2;
          resultArr2[j] = temp1;

          sum1 = sum1 - temp1.length + temp2.length;
          sum2 = sum2 - temp2.length + temp1.length;

          diff = newDiff;
          swapped = true;
        }
      }
    }
  }

  return { resultArr1, resultArr2 };
};
