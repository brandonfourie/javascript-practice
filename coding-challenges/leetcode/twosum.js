// Two Sum
// Finds two indices such that nums[i] + nums[j] = target
// Solved for algorithm practice

function twoSum(nums, target) {
    let seen = {};

    for (let idx = 0; idx < nums.length; idx++){
        if ((target - nums[idx]) in seen){
            return [idx, seen[target-nums[idx]]];
        }
        seen[nums[idx]] = idx;
    }
  }


console.log(twoSum([2,1,4,3], 7))

// What happens when you assign to a variable without declaring it - it creates an implicit global variable

// return values with commas - javascript executes left to right then discards to the left and only returns the right most return value