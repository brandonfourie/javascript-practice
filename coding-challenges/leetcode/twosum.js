// Two Sum
// Finds two indices such that nums[i] + nums[j] = target
// Solved for algorithm practice

function twoSum(nums, target) {
    // object to store values weve already iterated through
    // key - nums value
    // value - index value of key
    let seen = {};

    for (let idx = 0; idx < nums.length; idx++){
        // determie if complement is in seen
        if ((target - nums[idx]) in seen){
            return [idx, seen[target-nums[idx]]];
        }
        seen[nums[idx]] = idx;
    }
  }


console.log(twoSum([2,1,4,3], 7))