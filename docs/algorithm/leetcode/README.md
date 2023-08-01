# `LeetCode`

## 1. 209. 长度最小的子数组【中等】【数组】

### 题目

给定一个含有 `n` 个正整数的数组和一个正整数 `target` **。**

找出该数组中满足其和 `≥ target` 的长度最小的 **连续子数组** `[numsl, numsl+1, ..., numsr-1, numsr]` ，并返回其长度**。**如果不存在符合条件的子数组，返回 `0` 。

**示例 1：**

```
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

**示例 2：**

```
输入：target = 4, nums = [1,4,4]
输出：1
```

**示例 3：**

```
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
```

**提示：**

- `1 <= target <= 109`
- `1 <= nums.length <= 105`
- `1 <= nums[i] <= 105`

**进阶：**

- 如果你已经实现 `O(n)` 时间复杂度的解法, 请尝试设计一个 `O(n log(n))` 时间复杂度的解法。

### 题解

```c++
// 长度最小的子数组
#include <iostream>
#include <vector>

using namespace std;
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int result = INT32_MAX;
        int sum = 0;// 上下指针之和  滑动窗口数值之和
        int len = 0;// 上下指针长度  滑动窗口的长度
        int j = 0;// 起始位置 滑动窗口起始位置
        for (int i = 0; i < nums.size(); i++)
        {
            sum += nums[i];
            // 注意这里使用while，每次更新 i（起始位置），并不断比较子序列是否符合条件
            while (sum >= target)
            {
                len = (i - j + 1);
                result = result < len ? result : len;
                sum -= nums[j++];// 这里体现出滑动窗口的精髓之处，不断变更j（子序列的起始位置）
            }
        }
        // 如果result没有被赋值的话，就返回0，说明没有符合条件的子序列
        return result == INT32_MAX ? 0 : result;
    }
};


int main()
{
    Solution s;
    vector<int>v;
    v.push_back(1);
    v.push_back(4);
    v.push_back(4);
    int targetr = 4;
    int res = s.minSubArrayLen(targetr,v);
    cout << res;
}
```

## 59. 螺旋矩阵 II 【中等】【数组】

### 题目

给你一个正整数 `n` ，生成一个包含 `1` 到 `n2` 所有元素，且元素按顺时针顺序螺旋排列的 `n x n` 正方形矩阵 `matrix` 。

**示例 1：**

![1](./src/1.jpg)

```
输入：n = 3
输出：[[1,2,3],[8,9,4],[7,6,5]]
```

**示例 2：**

```
输入：n = 1
输出：[[1]]
```

**提示：**

- `1 <= n <= 20`

### 题解

```C++
#include <iostream>
#include <vector>

using namespace std;
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> arr(n,vector<int>(n));
        int length = n * n;
        int top = 0;
        int boottom = n - 1;
        int left = 0;
        int right = n - 1;
        int index = 1;
        while (index <= length)
        {
            // 上
            for (int t = left; t <= right; t++)
            {
                arr[top][t] = index++;
            }
            top++;
            // 右
            for (int r = top; r <= boottom; r++)
            {
                arr[r][right] = index++;
            }
            right--;
            // 下
            for (int b = right; b >= left; b--)
            {
                arr[boottom][b] = index++;
            }
            boottom--;
            // 左
            for (int l = boottom; l >= top; l--)
            {
                arr[l][left] = index++;
            }
            left++;
        }
        return arr;
    }
};


int main()
{
    Solution s;
    int n = 3;
    vector<vector<int>> arr(n, vector<int>(n));
    arr = s.generateMatrix(n);
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cout << arr[i][j];
        }
    }
}
```

