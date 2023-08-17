>  [代码随想录](https://programmercarl.com/)

## 🐋704.二分查找【简单】【数组】
<!-- tabs:start -->
#### **题目**

给定一个 `n` 个元素有序的（升序）整型数组 `nums` 和一个目标值 `target` ，写一个函数搜索 `nums` 中的 `target`，如果目标值存在返回下标，否则返回 `-1`。
**示例 1:**

```
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
```

**示例 2:**

```
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
```

**提示：**

1. 你可以假设 `nums` 中的所有元素是不重复的。
2. `n` 将在 `[1, 10000]`之间。
3. `nums` 的每个元素都将在 `[-9999, 9999]`之间。

#### **题解**

```C++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size()-1;
        while (left <= right) {
            int m = left + (( right - left ) / 2);
            int numsM = nums[m];
            if(numsM < target)
                left = m + 1;
            else if(numsM > target)
                right = m - 1;
            else
                return m;
        }
        return -1;
    }
};
```
<!-- tabs:end -->
## 🐋27. 移除元素
<!-- tabs:start -->
#### **题目**

给你一个数组 `nums` 和一个值 `val`，你需要 **[原地](https://baike.baidu.com/item/原地算法)** 移除所有数值等于 `val` 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 `O(1)` 额外空间并 **[原地 ](https://baike.baidu.com/item/原地算法)修改输入数组**。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

**说明:**

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以**「引用」**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

**示例 1：**

```
输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2]
解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
```

**示例 2：**

```
输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3]
解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
```

**提示：**

- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 50`
- `0 <= val <= 100`

#### **题解**

```C++
using namespace std;

//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int len = nums.size();
        for (int i = 0; i < len ; i++) {
            if(nums[i] == val)
            {
                for (int j = i + 1; j < len; j++) {
                    nums[ j - 1 ] =  nums[j];
                }
                i--;
                len--;
            }
        }
        return len;
    }
};
```
<!-- tabs:end -->

## **🐋**977. 有序数组平方
<!-- tabs:start -->
#### **题目**

给你一个按 **非递减顺序** 排序的整数数组 `nums`，返回 **每个数字的平方** 组成的新数组，要求也按 **非递减顺序** 排序。

**示例 1：**

```
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
```

**示例 2：**

```
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
```

**提示：**

- `1 <= nums.length <= 104`
- `-104 <= nums[i] <= 104`
- `nums` 已按 **非递减顺序** 排序

#### **题解**

```C++
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        int len = nums.size();
        for (int i = 0; i < len;i++) {
            nums[i] *= nums[i];
        }
        sort(nums.begin(),nums.end());
        return nums;
    }
};
```
<!-- tabs:end -->
## **🐋**209. 长度最小的子数组【中等】【数组】
<!-- tabs:start -->
#### **题目**

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

#### **题解**

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
<!-- tabs:end -->
## **🐋**59. 螺旋矩阵 II 【中等】【数组】
<!-- tabs:start -->
#### **题目**

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

#### **题解**

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
<!-- tabs:end -->
## **🐋**203. 移除链表元素【简单】【链表】
<!-- tabs:start -->
#### **题目**

给你一个链表的头节点 `head` 和一个整数 `val` ，请你删除链表中所有满足 `Node.val == val` 的节点，并返回 **新的头节点** 。

 

**示例 1：**

![2](./src/2.jpg)

```
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
```

**示例 2：**

```
输入：head = [], val = 1
输出：[]
```

**示例 3：**

```
输入：head = [7,7,7,7], val = 7
输出：[]
```

**提示：**

- 列表中的节点数目在范围 `[0, 104]` 内
- `1 <= Node.val <= 50`
- `0 <= val <= 50`

#### **题解**

```C++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeElements(ListNode* head, int val) {
        ListNode* dum = new ListNode(0); // 设置一个虚头节点
        dum->next = head;
        ListNode* cure = dum; // 当前元素
        while (cure->next!= NULL) {
            if (cure->next->val == val)
            {
                ListNode* temp = cure->next;
                cure->next = cure->next->next;
                delete temp;
            }
            else {
                cure = cure->next;
            }
        }
        head = dum->next;
        delete dum;
        return head;
    }
};         
```
<!-- tabs:end -->
## **🐋**707. 设计链表【中等】【链表】
<!-- tabs:start -->
#### **题目**

你可以选择使用单链表或者双链表，设计并实现自己的链表。

单链表中的节点应该具备两个属性：`val` 和 `next` 。`val` 是当前节点的值，`next` 是指向下一个节点的指针/引用。

如果是双向链表，则还需要属性 `prev` 以指示链表中的上一个节点。假设链表中的所有节点下标从 **0** 开始。

实现 `MyLinkedList` 类：

- `MyLinkedList()` 初始化 `MyLinkedList` 对象。
- `int get(int index)` 获取链表中下标为 `index` 的节点的值。如果下标无效，则返回 `-1` 。
- `void addAtHead(int val)` 将一个值为 `val` 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点。
- `void addAtTail(int val)` 将一个值为 `val` 的节点追加到链表中作为链表的最后一个元素。
- `void addAtIndex(int index, int val)` 将一个值为 `val` 的节点插入到链表中下标为 `index` 的节点之前。如果 `index` 等于链表的长度，那么该节点会被追加到链表的末尾。如果 `index` 比长度更大，该节点将 **不会插入** 到链表中。
- `void deleteAtIndex(int index)` 如果下标有效，则删除链表中下标为 `index` 的节点。

**示例：**

```
输入
["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
[[], [1], [3], [1, 2], [1], [1], [1]]
输出
[null, null, null, null, 2, null, 3]

解释
MyLinkedList myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
myLinkedList.addAtTail(3);
myLinkedList.addAtIndex(1, 2);    // 链表变为 1->2->3
myLinkedList.get(1);              // 返回 2
myLinkedList.deleteAtIndex(1);    // 现在，链表变为 1->3
myLinkedList.get(1);              // 返回 3
```

**提示：**

- `0 <= index, val <= 1000`
- 请不要使用内置的 `LinkedList` 库。
- 调用 `get`、`addAtHead`、`addAtTail`、`addAtIndex` 和 `deleteAtIndex` 的次数不超过 `2000` 。

#### **题解**

```C++
class MyLinkedList {
public:
    struct ListNode {
        int val;
        ListNode* next;
        ListNode() : val(0), next(nullptr) {}
        ListNode(int x) : val(x), next(nullptr) {}
        ListNode(int x, ListNode* next) : val(x), next(next) {}
    };
    MyLinkedList() {
        this->size = 0;
        this->head = new ListNode(0);
    }

    int get(int index) {
        if (index < 0 || index >= size)
        {
            return -1;
        }
        ListNode* cur = head;
        for (int i = 0; i <= index; i++) {
            cur = cur->next;
        }
        return cur->val;
    }

    void addAtHead(int val) {
        addAtIndex(0, val);
    }

    void addAtTail(int val) {
        addAtIndex(size, val);
    }

    void addAtIndex(int index, int val) {
        if (index > size)
            return;
        ListNode* p = head;
        index = max(0, index);
        size++;// 增加了一个结点，所以要自加
        // 找到index对应的结点
        for (int i = 0; i < index; i++) {
            p = p->next;
        }
        ListNode* s = new ListNode(val);// 要插入的元素
        s->next = p->next;
        p->next = s;
    }

    void deleteAtIndex(int index) {
        if (index < 0 || index >= size)
        {
            return;
        }
        size--;// 删除了一个结点所以要减去一个
        ListNode* p = head;
        // 找到index对应的结点
        for (int i = 0; i < index; i++) {
            p = p->next;
        }
        ListNode* q = p->next;
        p->next = p->next->next;
        delete q;
    }
private:
    int size = 0;
    ListNode* head;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList* obj = new MyLinkedList();
 * int param_1 = obj->get(index);
 * obj->addAtHead(val);
 * obj->addAtTail(val);
 * obj->addAtIndex(index,val);
 * obj->deleteAtIndex(index);
 */

```
<!-- tabs:end -->
## **🐋**206. 反转链表【简单】【链表】
<!-- tabs:start -->

#### **题目**

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

**示例 1：**

![3](./src/3.jpg)

```
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
```

**示例 2：**

![4](./src/4.jpg)

```
输入：head = [1,2]
输出：[2,1]
```

**示例 3：**

```
输入：head = []
输出：[]
```

**提示：**

- 链表中节点的数目范围是 `[0, 5000]`
- `-5000 <= Node.val <= 5000`

#### **题解**

```C++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* q = nullptr;// 上一个结点
         ListNode* p = head;// 当前结点
        while (p)
        {
            ListNode* t = p->next;// 记录下一个结点
            p->next = q;
            //p和q结点都前进一位
            q = p;
            p = t;
        }
        return q;
    }
};
```

#### **采用递归的方式**

```C++
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if(head== nullptr || head->next == nullptr)
        {
            return head;
        }
        ListNode * newP = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return newP;
    }
};
```
<!-- tabs:end -->
## **🐋**24. 两两交换链表中的节点【中等】【链表】
<!-- tabs:start -->
#### **题目**

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

**示例 1：**

![img](./src/5.jpg)

```
输入：head = [1,2,3,4]
输出：[2,1,4,3]
```

**示例 2：**

```
输入：head = []
输出：[]
```

**示例 3：**

```
输入：head = [1]
输出：[1]
```

**提示：**

- 链表中节点的数目在范围 `[0, 100]` 内
- `0 <= Node.val <= 100`

#### **题解**

![1](./src/1.png)

```C++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
       ListNode* swapPairs(ListNode* head) {
        ListNode * fHead = new ListNode(0);
        fHead -> next = head;
        ListNode * cur = fHead; // 记录当前节点
        while( cur->next!=nullptr && cur->next->next != nullptr)
        {
            ListNode *t1 = cur->next;
            ListNode *t2 = cur->next->next;
            ListNode *t3 = cur->next->next->next;
            cur -> next = t2;
            cur -> next -> next = t1;
            cur -> next -> next -> next = t3;

            // 移动cur准备下一次交换，
            cur = cur -> next -> next;
        }
        return fHead->next;
    }
};
```
<!-- tabs:end -->
## **🐋**19. 删除链表的倒数第N个结点【中等】【链表】
<!-- tabs:start -->
#### **题目**

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

**示例 1：**

![img](./src/6.jpg)

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**示例 2：**

```
输入：head = [1], n = 1
输出：[]
```

**示例 3：**

```
输入：head = [1,2], n = 1
输出：[1]
```

**提示：**

- 链表中结点的数目为 `sz`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

#### **题解**

```C++
class Solution {
public:
   ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode * pHead = new ListNode(0);
        pHead->next = head;
        ListNode * cur = pHead;
        ListNode * lenHead = pHead;
        int count = 0;
        int len = 0;
        while (lenHead->next != nullptr)
        {
            lenHead = lenHead->next;
            len++;
        }
        while (cur->next != nullptr)
        {
            count++;
            if (len-n+1 == count)
            {
                ListNode* temp = cur->next;
                cur->next = cur->next->next;
                delete temp;
            }
            else
            {
                cur = cur->next;
            }
        }
        head = pHead->next;
        delete pHead;
        return head;
    }
};
```
<!-- tabs:end -->
## **🐋**面试题 02.07. 链表相交【简单】【链表】
<!-- tabs:start -->
#### **题目**

给你两个单链表的头节点 `headA` 和 `headB` ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 `null` 。

图示两个链表在节点 `c1` 开始相交**：**

![img](./src/2.png)

题目数据 **保证** 整个链式结构中不存在环。

**注意**，函数返回结果后，链表必须 **保持其原始结构** 。

 

**示例 1：**

![img](./src/3.png)

```
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at '8'
解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
```

**示例 2：**

![img](./src/4.png)

```
输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Intersected at '2'
解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。
在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
```

**示例 3：**

![img](./src/5.png)

```
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：null
解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
这两个链表不相交，因此返回 null 。 
```

**提示：**

- `listA` 中节点数目为 `m`
- `listB` 中节点数目为 `n`
- `0 <= m, n <= 3 * 104`
- `1 <= Node.val <= 105`
- `0 <= skipA <= m`
- `0 <= skipB <= n`
- 如果 `listA` 和 `listB` 没有交点，`intersectVal` 为 `0`
- 如果 `listA` 和 `listB` 有交点，`intersectVal == listA[skipA + 1] == listB[skipB + 1]`

#### **题解1:双指针**

```C++
class Solution {
public:
 ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        // 双指针实现
        if (headA == nullptr || headB == nullptr)
        {
            return nullptr;
        }
        ListNode* pa = headA;
        ListNode* pb = headB;
        // 查询相等的情况，不相等则next下一个，如果相等了，在headA的next指向headB的相等元素的next
        while (pa != pb)
        {
            pa = pa == nullptr ? headB : pa->next;
            pb = pb == nullptr ? headA : pb->next;
        }
        return pa;
    }
};
```

#### **题解2:哈希集合**

```C++
// 官方答案
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        unordered_set<ListNode *> visited;
        ListNode *temp = headA;
        while (temp != nullptr) {
            visited.insert(temp);
            temp = temp->next;
        }
        temp = headB;
        while (temp != nullptr) {
            if (visited.count(temp)) {
                return temp;
            }
            temp = temp->next;
        }
        return nullptr;
    }
};
```
<!-- tabs:end -->
## **🐋**142. 环形链表 II【中等 】【链表】
<!-- tabs:start -->
#### **题目**

给定一个链表的头节点  `head` ，返回链表开始入环的第一个节点。 *如果链表无环，则返回 `null`。*

如果链表中有某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 `pos` 来表示链表尾连接到链表中的位置（**索引从 0 开始**）。如果 `pos` 是 `-1`，则在该链表中没有环。**注意：`pos` 不作为参数进行传递**，仅仅是为了标识链表的实际情况。

**不允许修改** 链表

**示例 1：**

![6](./src/6.png)

```
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例 2：**

![7](./src/7.png)

```
输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例 3：**

![8](./src/8.png)

```
输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。
```

**提示：**

- 链表中节点的数目范围在范围 `[0, 104]` 内
- `-105 <= Node.val <= 105`
- `pos` 的值为 `-1` 或者链表中的一个有效索引

**进阶：**你是否可以使用 `O(1)` 空间解决此题？

#### **题解**

> 不要被pos干扰，实际链表中存在环或者直接没有环，pos只是标记环的位置

```C++
// 哈希表
class Solution {
public:
    ListNode* detectCycle(ListNode* head) {
        unordered_set<ListNode*>newHead;
        while (head != nullptr)
        {
            if (newHead.count(head))
            {
                return head;
            }
            newHead.insert(head);
            head = head->next;
        }
        return nullptr;
    }
};
```
<!-- tabs:end -->
## **🐋**242. 有效的字母异位词【简单】【哈希表】
<!-- tabs:start -->
#### **题目**

给定两个字符串 `*s*` 和 `*t*` ，编写一个函数来判断 `*t*` 是否是 `*s*` 的字母异位词。

**注意：**若 `*s*` 和 `*t*` 中每个字符出现的次数都相同，则称 `*s*` 和 `*t*` 互为字母异位词。

 

**示例 1:**

```
输入: s = "anagram", t = "nagaram"
输出: true
```

**示例 2:**

```
输入: s = "rat", t = "car"
输出: false
```

**提示:**

- `1 <= s.length, t.length <= 5 * 104`
- `s` 和 `t` 仅包含小写字母

**进阶:** 如果输入字符串包含 `unicode` 字符怎么办？你能否调整你的解法来应对这种情况？

#### **题解**

```C++
class Solution {
public:
     bool isAnagram(string s, string t) {
        if (s.length() != t.length()) {
            return false;
        }
        sort(s.begin(), s.end());
        sort(t.begin(), t.end());
        return s == t;
    }
};
```
<!-- tabs:end -->
## **🐋**`1002. 查找共用字符`【简单】【哈希表】
<!-- tabs:start -->
#### **题目**

给你一个字符串数组 `words` ，请你找出所有在 `words` 的每个字符串中都出现的共用字符（ **包括重复字符**），并以数组形式返回。你可以按 **任意顺序** 返回答案。 

**示例 1：**

```
输入：words = ["bella","label","roller"]
输出：["e","l","l"]
```

**示例 2：**

```
输入：words = ["cool","lock","cook"]
输出：["c","o"]
```

**提示：**

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` 由小写英文字母组成

#### **题解**

```c++
#include<iostream>
#include<vector>
#include<set>
using namespace std;
//
class Solution {
public:
    vector<string> commonChars(vector<string>& words) {
        //minfreq存储字符在所有字符中出现次数的最小值
        vector<int> minfreq(26, INT_MAX);
        // freq 判断每个字符串中出现  字符 次数
        vector<int> freq(26);
        for (const string& word : words) {
            fill(freq.begin(), freq.end(), 0); // 给freq元素赋值为0
            for (char ch : word) { // 遍历完第一个单词
                ++freq[ch - 'a'];
            }
            // 每次取最小值，来确定那个字符在三个字符串都出现，并统计了各个出现的次数
            for (int i = 0; i < 26; ++i) {
                minfreq[i] = min(minfreq[i], freq[i]);
            }
        }

        vector<string> ans;
        // 循环判断0-25，j < minfreq[i]   ，还原成 字母
        for (int i = 0; i < 26; ++i) {
            for (int j = 0; j < minfreq[i]; ++j) {
                ans.emplace_back(1, i + 'a');
            }
        }
        return ans;
    }
};

int main()
{
    vector<string>st;
    st.push_back("bella");
    st.push_back("label");
    st.push_back("roller");
    Solution s;
    vector<string>s1;
    s1 = s.commonChars(st);
    for (vector<string>::iterator it = s1.begin(); it != s1.end(); it++)
    {
        cout << *it << endl;
    }
}
```
<!-- tabs:end -->
## **🐋**349. 两个数组的交集【简单】【哈希表】
<!-- tabs:start -->
#### **题目**

给定两个数组 `nums1` 和 `nums2` ，返回 *它们的交集* 。输出结果中的每个元素一定是 **唯一** 的。我们可以 **不考虑输出结果的顺序** 。

**示例 1：**

```
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
```

**示例 2：**

```
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
解释：[4,9] 也是可通过的
```

**提示：**

- `1 <= nums1.length, nums2.length <= 1000`
- `0 <= nums1[i], nums2[i] <= 1000`

#### **题解**

```C++
#include<iostream>
#include<vector>
#include<unordered_set>

using namespace std;

class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int>n1(nums1.begin(),nums1.end());
        unordered_set<int>n2(nums2.begin(), nums2.end());
        vector<int>res;
        for (auto it = n1.begin(); it != n1.end(); ++it) {
            for (auto ite = n2.begin(); ite != n2.end(); ++ite) {
                if (*it == *ite)
                {
                    res.push_back(*it);
                }
            }
        }
        return res;
    }
};


int main()
{
    vector<int>n1 = { 1,2,2,1 };
    vector<int>n2 = { 2,2 };
    Solution s;
    for (int elem : s.intersection(n1, n2))
    {
        cout << elem << endl;
    }
}
```
<!-- tabs:end -->
## **🐋**202. 快乐数【简单】【哈希表】
<!-- tabs:start -->
#### **题目**

编写一个算法来判断一个数 `n` 是不是快乐数。

**「快乐数」** 定义为：

- 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
- 然后重复这个过程直到这个数变为 1，也可能是 **无限循环** 但始终变不到 1。
- 如果这个过程 **结果为** 1，那么这个数就是快乐数。

如果 `n` 是 *快乐数* 就返回 `true` ；不是，则返回 `false` 。

**示例 1：**

```
输入：n = 19
输出：true
解释：
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```

**示例 2：**

```
输入：n = 2
输出：false
```

**提示：**

- `1 <= n <= 231 - 1`

#### **题解**

```c++
// 快慢指针
class Solution {
public:
    // 求平方和函数
    int squareSum(int num)
    {
        int sum = 0;
        while(num > 0)
        {
            int g = num % 10; // 取出个位
            sum += g * g;
            num = num / 10; //下一位求平方
        }
        return sum;
    }
    bool isHappy(int n) {
        // 采用快慢指针的方法完成
        int slow=n,fast=n;
        do{
            slow = squareSum(slow);
            fast = squareSum(fast);
            fast = squareSum(fast);
        }while(slow != fast);
        // 当快慢指针相遇了就要考虑
        return slow == 1;
    }
};
```
<!-- tabs:end -->
## **🐋**1. 两数之和【简单】【哈希表】
<!-- tabs:start -->
#### **题目**

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** *`target`* 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

**示例 1：**

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

**示例 2：**

```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

**示例 3：**

```
输入：nums = [3,3], target = 6
输出：[0,1]
```

**提示：**

- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- **只会存在一个有效答案**

**进阶：**你可以想出一个时间复杂度小于 `O(n2)` 的算法吗？

#### **题解**

```C++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // 第一种
//        int len=nums.size();
//        for(int i=0;i<len;i++)
//        {
//            for(int j=i+1;j<len;j++)
//            {
//                if(nums[i]+nums[j]==target){
//                    return {i,j};
//                }
//            }
//        }
//        return {};
//  第二种
//        map<int,int>index;
//        for(int i=0;i<nums.size();i++)  //存储每个元素的下标
//            index[nums[i]]=i;
//        for(int j=0;j<nums.size();j++)
//            //当target-nums[j]的差的下标存在，同时不是j的时候，输出相应的下标
//            if(index[target-nums[j]]!=0&&index[target-nums[j]]!=j)
//                return {j,index[target-nums[j]]};
//        return {};
//  第三种
        map<int,int>h;
        for (int i = 0; i < nums.size(); ++i) {
            int n = target - nums[i];
            if(h.find(n) != h.end())
            {
                return {h.at(n),i};
            }
            else
            {
                h[nums[i]] = i;
            }
        }
        return {};
    }
};
```
<!-- tabs:end -->
## **🐋**454. 四数相加Ⅱ【中等】【哈希表】
<!-- tabs:start -->
#### **题目**

给你四个整数数组 `nums1`、`nums2`、`nums3` 和 `nums4` ，数组长度都是 `n` ，请你计算有多少个元组 `(i, j, k, l)` 能满足：

- `0 <= i, j, k, l < n`
- `nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0`

**示例 1：**

```
输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
输出：2
解释：
两个元组如下：
1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
```

**示例 2：**

```
输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
输出：1
```

 **提示：**

- `n == nums1.length`
- `n == nums2.length`
- `n == nums3.length`
- `n == nums4.length`
- `1 <= n <= 200`
- `-228 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 228`

#### **题解**

```c++
// for循环遍历会超出内存
// 注意分组思想
class Solution {
public:
    int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3, vector<int>& nums4) {
        unordered_map<int, int>h;
        int count = 0;
        int target = 0;
        for (auto e : nums1)
        {
            for (auto el : nums2)
            {
                ++h[e + el];
            }
        }
        for (auto e : nums3)
        {
            for (auto el : nums4)
            {
                target = 0 - (e + el);
                // 如果在上一个循环中找到进入 if条件
                if (h.find(target) != h.end())
                {
                    count += h[target];
                }
            }
        }
        return count;
    }
};  
```
<!-- tabs:end -->
## **🐋**383. 赎金信【简单】【哈希表】
<!-- tabs:start -->
#### **题目**

给你两个字符串：`ransomNote` 和 `magazine` ，判断 `ransomNote` 能不能由 `magazine` 里面的字符构成。

如果可以，返回 `true` ；否则返回 `false` 。

`magazine` 中的每个字符只能在 `ransomNote` 中使用一次。

**示例 1：**

```
输入：ransomNote = "a", magazine = "b"
输出：false
```

**示例 2：**

```
输入：ransomNote = "aa", magazine = "ab"
输出：false
```

**示例 3：**

```
输入：ransomNote = "aa", magazine = "aab"
输出：true
```

**提示：**

- `1 <= ransomNote.length, magazine.length <= 105`
- `ransomNote` 和 `magazine` 由小写英文字母组成

#### **题解**

```C++
#include<iostream>
#include<vector>

using namespace std;

class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        if (ransomNote.size() > magazine.size())
            return false;
        vector<int>count(26);
        for (auto& el : magazine)
        {
            count[el - 'a']++;
        }
        for (auto& el : ransomNote)
        {
            count[el - 'a']--;
            if (count[el - 'a'] < 0) {// 小于0的话就代表没有这个字符，一定是要大的先进入
                return false;
            }
        }
        return true;
    }
};

int main()
{
    string ransomNote = "ab";
    string magazine = "aab";
    Solution s;
    cout << s.canConstruct(ransomNote, magazine);
}
```
<!-- tabs:end -->
## **🐋**15. 三数之和【中等】【哈希表】
<!-- tabs:start -->
#### **题目**

给你一个整数数组 `nums` ，判断是否存在三元组 `[nums[i], nums[j], nums[k]]` 满足 `i != j`、`i != k` 且 `j != k` ，同时还满足 `nums[i] + nums[j] + nums[k] == 0` 。请

你返回所有和为 `0` 且不重复的三元组。

**注意：**答案中不可以包含重复的三元组。

**示例 1：**

```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
```

**示例 2：**

```
输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
```

**示例 3：**

```
输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。
```

**提示：**

- `3 <= nums.length <= 3000`
- `-105 <= nums[i] <= 105`

#### **题解**

```c++
#include<iostream>
#include<vector>
#include<unordered_set>
#include<algorithm>
using namespace std;
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> result;
        sort(nums.begin(), nums.end());
        // 找出a + b + c = 0
        // a = nums[i], b = nums[left], c = nums[right]
        int target = 0;
        int n = nums.size();
        result.reserve(n > 256 ? 256 : n);
        for (int i = 0; i < n; i++) {
            // 排序之后如果第一个元素已经大于零，那么无论如何组合都不可能凑成三元组，直接返回结果就可以了
            if (nums[i] > 0) {
                return result;
            }
            // 错误去重a方法，将会漏掉-1,-1,2 这种情况
            /*
            if (nums[i] == nums[i + 1]) {
                continue;
            }
            */
            // 正确去重a方法
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            int left = i + 1;
            int right = n - 1;
            while (right > left) {
                // 去重复逻辑如果放在这里，0，0，0 的情况，可能直接导致 right<=left 了，从而漏掉了 0,0,0 这种三元组
                /*
                while (right > left && nums[right] == nums[right - 1]) right--;
                while (right > left && nums[left] == nums[left + 1]) left++;
                */
                target = nums[i] + nums[left] + nums[right];
                if (target  > 0) right--;
                else if (target < 0) left++;
                else {
                    result.push_back(vector<int>{nums[i], nums[left], nums[right]});
                    // 去重逻辑应该放在找到一个三元组之后，对b 和 c去重  去掉值相等的情况
                    while (right > left && nums[right] == nums[right - 1]) right--;
                    while (right > left && nums[left] == nums[left + 1]) left++;

                    // 找到答案时，双指针同时收缩
                    right--;
                    left++;
                }
            }

        }
        return result;
    }
};

int main()
{
    vector<int>nums = { -1,0,1,2,-1,-4 };
    Solution s;
    for (auto& el : s.threeSum(nums))
    {
        for (auto& e : el)
        {
            cout << e << endl;
        }
    }
}
```
<!-- tabs:end -->
## **🐋**18. 四树之和【中等】【哈希表】
<!-- tabs:start -->
#### **题目**

给你一个由 `n` 个整数组成的数组 `nums` ，和一个目标值 `target` 。请你找出并返回满足下述全部条件且**不重复**的四元组 `[nums[a], nums[b], nums[c], nums[d]]` （若两个四元组元素一一对应，则认为两个四元组重复）：

- `0 <= a, b, c, d < n`
- `a`、`b`、`c` 和 `d` **互不相同**
- `nums[a] + nums[b] + nums[c] + nums[d] == target`

你可以按 **任意顺序** 返回答案 。

**示例 1：**

```
输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

**示例 2：**

```
输入：nums = [2,2,2,2,2], target = 8
输出：[[2,2,2,2]]
```

**提示：**

- `1 <= nums.length <= 200`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`

#### **题解（双指针）**

```c++
#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int left = 0;// 左指针
        int right = 0;// 右指针
        res.reserve(n > 256 ? 256 : n);
        long tar = 0;
        for (int i = 0; i < n; i++)
        {
            // 排除首个元素一定不成立的元素
            if (nums[i] > target && nums[i] >= 0)
                break;
            // 去重
            if (i > 0 && nums[i] == nums[i - 1])
                continue;
            for (int j = i + 1; j < n; j++)
            {
                if (nums[i] + nums[j] > target && nums[i] + nums[j] >= 0)
                    break;
                if (j > i + 1 && nums[j] == nums[j - 1])
                    continue;
                left = j + 1;
                right = n - 1;
                while (right > left)
                {
                    tar = (long)nums[i] + nums[j] + nums[left] + nums[right];

                    if (tar > target)right--;
                    else if (tar < target)left++;
                    else {
                        res.push_back(vector<int>{nums[i], nums[j], nums[left], nums[right]});
                        while (right > left && nums[right] == nums[right - 1]) right--;
                        while (right > left && nums[left] == nums[left + 1]) left++;
                        right--;
                        left++;
                    }
                }
            }
        }
        return res;
    }
};


int main()
{
    vector<int>nums = { 1,0,-1,0,-2,2 };
    int target = 0;
    Solution s;
    for (auto& el : s.fourSum(nums,target))
    {
        for (auto& e : el)
        {
            cout << e << endl;
        }
    }
}
```
<!-- tabs:end -->
## **🐋**344 反转字符串【简单】【字符串】
<!-- tabs:start -->
#### **题目**

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 `s` 的形式给出。

不要给另外的数组分配额外的空间，你必须**[原地](https://baike.baidu.com/item/原地算法)修改输入数组**、使用 O(1) 的额外空间解决这一问题。

**示例 1：**

```
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
```

**示例 2：**

```
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```

**提示：**

- `1 <= s.length <= 105`
- `s[i]` 都是 [ASCII](https://baike.baidu.com/item/ASCII) 码表中的可打印字符

#### **题解（双指针）**

```C++
class Solution {
public:
    void reverseString(vector<char>& s) {
        int n = s.size();
        int l = 0;
        int r = n - 1;
        s.reserve( n > 128 ? 128 :n);
        for(l,r; l < r;l++,r--)
        {
            swap(s[l],s[r]);
        }
    }
};
```
<!-- tabs:end -->
## **🐋**541. 反转字符串【简单】【字符串】
<!-- tabs:start -->
#### **题目**

给定一个字符串 `s` 和一个整数 `k`，从字符串开头算起，每计数至 `2k` 个字符，就反转这 `2k` 字符中的前 `k` 个字符。

- 如果剩余字符少于 `k` 个，则将剩余字符全部反转。
- 如果剩余字符小于 `2k` 但大于或等于 `k` 个，则反转前 `k` 个字符，其余字符保持原样。

**示例 1：**

```
输入：s = "abcdefg", k = 2
输出："bacdfeg"
```

**示例 2：**

```
输入：s = "abcd", k = 2
输出："bacd"
```

**提示：**

- `1 <= s.length <= 104`
- `s` 仅由小写英文组成
- `1 <= k <= 104`

#### **题解**

```c++
#include<iostream>
#include<string>
using namespace std;

class Solution {
public:
    //反转每个下标从 2k2k2k 的倍数开始的，长度为 kkk 的子串。若该子串长度不足 kkk，则反转整个子串。
    string reverseStr(string s, int k) {
        int n = s.length();
        for (int i = 0; i < n; i += 2 * k) {
            cout << *s.begin() << endl;
            reverse(s.begin() + i, s.begin() + min(i + k, n)); // 每次操作前k个字符 左闭右开
        }
        return s;
    }
};

int main()
{
    string s = "abcdefg";
    int k = 2;
    Solution so;
    cout << so.reverseStr(s, k);

}
```
<!-- tabs:end -->
## **🐋**剑指offer 05. 替换空格【简单】【字符串】
<!-- tabs:start -->
#### **题目**

请实现一个函数，把字符串 `s` 中的每个空格替换成"%20"。

**示例 1：**

```
输入：s = "We are happy."
输出："We%20are%20happy."
```

**限制：**

```
0 <= s 的长度 <= 10000
```

#### **题解（双指针）**

```c++
#include<iostream>
#include<string>

using namespace std;

class Solution {
public:
    string replaceSpace(string s) {
        int count = 0;// 统计空格
        int osize = s.size();
        for (int i = 0; i < osize; i++)
        {
            if (s[i] == ' ')
            {
                count++;
            }
        }
        s.resize(osize+count*2);
        int nsize = s.size();
        for (int optr = osize - 1, nptr = nsize - 1; optr < nptr; optr--, nptr--) {
            if (s[optr] != ' ')
            {
                s[nptr] = s[optr];
            }
            else {
                s[nptr] = '0';
                s[nptr-1] = '2';
                s[nptr-2] = '%';
                nptr -= 2;
            }
        }
        return s;
    }
};

int main() {
    string s = "We are h";
    Solution ss;
    string res = ss.replaceSpace(s);
    cout << res;
}
```
<!-- tabs:end -->
## **🐋**151. 反转字符串中的单词
<!-- tabs:start -->
#### **题目**

给你一个字符串 `s` ，请你反转字符串中 **单词** 的顺序。

**单词** 是由非空格字符组成的字符串。`s` 中使用至少一个空格将字符串中的 **单词** 分隔开。

返回 **单词** 顺序颠倒且 **单词** 之间用单个空格连接的结果字符串。

**注意：**输入字符串 `s`中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。

**示例 1：**

```
输入：s = "the sky is blue"
输出："blue is sky the"
```

**示例 2：**

```
输入：s = "  hello world  "
输出："world hello"
解释：反转后的字符串中不能存在前导空格和尾随空格。
```

**示例 3：**

```
输入：s = "a good   example"
输出："example good a"
解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。
```

**提示：**

- `1 <= s.length <= 104`
- `s` 包含英文大小写字母、数字和空格 `' '`
- `s` 中 **至少存在一个** 单词

**进阶：**如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 `O(1)` 额外空间复杂度的 **原地** 解法。

#### **题解**

```c++

class Solution {
public:
    void reverse(string& s, int start, int end) { //翻转，区间写法：左闭右闭 []
        for (int i = start, j = end; i < j; i++, j--) {
            swap(s[i], s[j]);
        }
    }
    //删除空格
    void clearSpace(string& s) {//去除所有空格并在相邻单词之间添加空格, 快慢指针。
        int slow = 0;  
        int fast = 0;
        for ( fast; fast < s.size(); ++fast) { //
            if (s[fast] != ' ') { //遇到非空格就处理，即删除所有空格。
                if (slow != 0) s[slow++] = ' '; //手动控制空格，给单词之间添加空格。slow != 0说明不是第一个单词，需要在单词前添加空格。
                while (fast < s.size() && s[fast] != ' ') { //补上该单词，遇到空格说明单词结束。
                    s[slow++] = s[fast++];
                }
            }
        }
        s.resize(slow); //slow的大小即为去除多余空格后的大小。
    }
    string reverseWords(string s) {
        clearSpace(s);
        reverse(s, 0, s.size() - 1);
        int start = 0; //removeExtraSpaces后保证第一个单词的开始下标一定是0。
        for (int i = 0; i <= s.size(); ++i) {
            if (i == s.size() || s[i] == ' ') { //到达空格或者串尾，说明一个单词结束。进行翻转。
                reverse(s, start, i - 1); //翻转，注意是左闭右闭 []的翻转。
                start = i + 1; //更新下一个单词的开始下标start
            }
        }
        return s;
    }
};
```
<!-- tabs:end -->
## **🐋**剑指 Offer 58 - II. 左旋转字符串
<!-- tabs:start -->
#### **题目**

+ 字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串`"abcdefg"`和数字`2`，该函数将返回左旋转两位得到的结果`"cdefgab"。`

**示例 1：**

```
输入: s = "abcdefg", k = 2
输出: "cdefgab"
```

**示例 2：**

```
输入: s = "lrloseumgh", k = 6
输出: "umghlrlose"
```

**限制：**

- `1 <= k < s.length <= 10000`

#### **题解**

```C++
class Solution {
public:
    string reverseLeftWords(string s, int n) {
        string news = s;
        int len = s.size();
        for (int i = 0; i < len; i++)
        {
            news[(i + len - n) % len] = s[i];
        }
        return news;

    }
};
```
<!-- tabs:end -->
## **🐋**28. 找出字符串中第一个匹配项的下标【简单】【字符串】
<!-- tabs:start -->
#### **题目**

给你两个字符串 `haystack` 和 `needle` ，请你在 `haystack` 字符串中找出 `needle` 字符串的第一个匹配项的下标（下标从 0 开始）。如果 `needle` 不是 `haystack` 的一部分，则返回 `-1` 。

**示例 1：**

```
输入：haystack = "sadbutsad", needle = "sad"
输出：0
解释："sad" 在下标 0 和 6 处匹配。
第一个匹配项的下标是 0 ，所以返回 0 。
```

**示例 2：**

```
输入：haystack = "leetcode", needle = "leeto"
输出：-1
解释："leeto" 没有在 "leetcode" 中出现，所以返回 -1 。
```

**提示：**

- `1 <= haystack.length, needle.length <= 104`
- `haystack` 和 `needle` 仅由小写英文字符组成

#### **题解**

```c++
// i——后缀末尾位置
// j——前缀末尾位置
// 前缀——包括首字母，不包含尾字母的的所有字串
// 后缀——包括尾字母，不包含首字母的的所有字串

class Solution {
public:
    void getNext(int* next, const string& s) {
        int j = -1;
        next[0] = j;
        for (int i = 1; i < s.size(); i++) { // 注意i从1开始
            while (j >= 0 && s[i] != s[j + 1]) { // 前后缀不相同了
                j = next[j]; // 向前回退
            }
            if (s[i] == s[j + 1]) { // 找到相同的前后缀
                j++;
            }
            next[i] = j; // 将j（前缀的长度）赋给next[i]
        }
    }
	int strStr(string haystack, string needle) {
        if (needle.size() == 0) {
            return 0;
        }
        int next[needle.size()];
        getNext(next, needle);
        int j = -1; // // 因为next数组里记录的起始位置为-1
        for (int i = 0; i < haystack.size(); i++) { // 注意i就从0开始
            while(j >= 0 && haystack[i] != needle[j + 1]) { // 不匹配
                j = next[j]; // j 寻找之前匹配的位置
            }
            if (haystack[i] == needle[j + 1]) { // 匹配，j和i同时向后移动
                j++; // i的增加在for循环里
            }
            if (j == (needle.size() - 1) ) { // 文本串s里出现了模式串t
                return (i - needle.size() + 1);
            }
        }
        return -1;
    }
};

```

<!-- tabs:end -->


## **🐋**459. 重复的子字符串【简单】【字符串】
<!-- tabs:start -->
#### **题目**

给定一个非空的字符串 `s` ，检查是否可以通过由它的一个子串重复多次构成。

**示例 1:**

```
输入: s = "abab"
输出: true
解释: 可由子串 "ab" 重复两次构成。
```

**示例 2:**

```
输入: s = "aba"
输出: false
```

**示例 3:**

```
输入: s = "abcabcabcabc"
输出: true
解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)
```

**提示：**

- `1 <= s.length <= 104`
- `s` 由小写英文字母组成

#### **题解1：移动匹配**

```C++
class Solution {
public:
    // 移动匹配
    // 既然前面有相同的子串，后面有相同的子串，
    // 用 s + s，这样组成的字符串中，后面的子串做前串，前后的子串做后串，就一定还能组成一个s
    bool repeatedSubstringPattern(string s) {
        string str = s + s;
        str.erase(str.begin());
        str.erase(str.end()-1);
        if (str.find(s) != string::npos) return true;
        return false;
    }
};

/*
* 不过这种解法还有一个问题，就是 我们最终还是要
 判断 一个字符串（s + s）是否出现过 s 的过程，可能直接用contains，
 find 之类的库函数。 却忽略了实现这些函数的时间复杂度
（暴力解法是m * n，一般库函数实现为 O(m + n)）。
*/
```

#### **题解2:KMP**
> 数组长度减去最长相同前后缀的长度相当于是第一个周期的长度，也就是一个周期的长度，如果这个周期可以被整除，就说明整个数组就是这个周期的循环。
```c++
class Solution {
public:
    void getNext (int* next, const string& s){
        next[0] = -1;
        int j = -1;
        for(int i = 1;i < s.size(); i++){
            while(j >= 0 && s[i] != s[j + 1]) {
                j = next[j];
            }
            if(s[i] == s[j + 1]) {
                j++;
            }
            next[i] = j;
        }
    }
    bool repeatedSubstringPattern (string s) {
        if (s.size() == 0) {
            return false;
        }
        int next[s.size()];
        getNext(next, s);
        int len = s.size();
        if (next[len - 1] != -1 && len % (len - (next[len - 1] + 1)) == 0) {
            return true;
        }
        return false;
    }
};
```

<!-- tabs:end -->

## **🐋**232.用栈实现队列【简单】【**栈与队列**】

<!-- tabs:start -->

#### **题目**

请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（`push`、`pop`、`peek`、`empty`）：

实现 `MyQueue` 类：

- `void push(int x)` 将元素 x 推到队列的末尾
- `int pop()` 从队列的开头移除并返回元素
- `int peek()` 返回队列开头的元素
- `boolean empty()` 如果队列为空，返回 `true` ；否则，返回 `false`

**说明：**

- 你 **只能** 使用标准的栈操作 —— 也就是只有 `push to top`, `peek/pop from top`, `size`, 和 `is empty` 操作是合法的。
- 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

**示例 1：**

```
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```

**提示：**

- `1 <= x <= 9`
- 最多调用 `100` 次 `push`、`pop`、`peek` 和 `empty`
- 假设所有操作都是有效的 （例如，一个空的队列不会调用 `pop` 或者 `peek` 操作）

**进阶：**

- 你能否实现每个操作均摊时间复杂度为 `O(1)` 的队列？换句话说，执行 `n` 个操作的总时间复杂度为 `O(n)` ，即使其中一个操作可能花费较长时间。

#### **说明**

使用栈来模式队列的行为，如果仅仅用一个栈，是一定不行的，所以需要两个栈**一个输入栈，一个输出栈**，这里要注意输入栈和输出栈的关系。

下面动画模拟以下队列的执行过程：

执行语句：
queue.push(1);
queue.push(2);
queue.pop(); **注意此时的输出栈的操作**
queue.push(3);
queue.push(4);
queue.pop();
queue.pop();**注意此时的输出栈的操作**
queue.pop();
queue.empty();

![1](./src/1.gif)

####  **题解**

```c++
class MyQueue {
public:
    stack<int> in,out;
    MyQueue() {

    }

    void push(int x) {
        in.push(x);
    }

    int pop() {
        if (out.empty()) {
            while (!in.empty()) {
                out.push(in.top());
                in.pop();
            }
        }
        int res = out.top();
        out.pop();
        return res;
    }

    int peek() { // 返回队列首部的元素。
        int result = this->pop();
        out.push(result);
        return result;
    }

    bool empty() {
        return in.empty() && out.empty();
    }
};
```

<!-- tabs:end -->

## **🐋**225 用队列实现栈【简单】【**栈与队列**】

<!-- tabs:start -->

#### **题目**

请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（`push`、`top`、`pop` 和 `empty`）。

实现 `MyStack` 类：

- `void push(int x)` 将元素 x 压入栈顶。
- `int pop()` 移除并返回栈顶元素。
- `int top()` 返回栈顶元素。
- `boolean empty()` 如果栈是空的，返回 `true` ；否则，返回 `false` 。

 

**注意：**

- 你只能使用队列的基本操作 —— 也就是 `push to back`、`peek/pop from front`、`size` 和 `is empty` 这些操作。
- 你所使用的语言也许不支持队列。 你可以使用 list （列表）或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。

**示例：**

```
输入：
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 2, 2, false]

解释：
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // 返回 2
myStack.pop(); // 返回 2
myStack.empty(); // 返回 False
```

**提示：**

- `1 <= x <= 9`
- 最多调用`100` 次 `push`、`pop`、`top` 和 `empty`
- 每次调用 `pop` 和 `top` 都保证栈不为空

**进阶：**你能否仅用一个队列来实现栈。

#### **题解一（双队列）**

![2](./src/2.gif)

```C++
#include<iostream>
#include<queue>

using namespace std;


class MyStack {
public:
    queue<int> q1, q2;//q2 用来备份
    MyStack() { }

    void push(int x) {
        q1.push(x);
    }

    int pop() {
        int size = q1.size();
        size--;
        while (size--)/// 将q1 导入q2，但要留下最后一个元素
        {
            q2.push(q1.front());
            q1.pop();
        }
        int res = q1.front();// // 留下的最后一个元素就是要返回的值
        q1.pop();
        q1 = q2; //再将que2赋值给que1
        while (!q2.empty())
        {
            q2.pop();
        }
        return res;
    }

    int top() {
        return q1.back();
    }

    bool empty() {
        return q1.empty();
    }
};


int main()
{
    MyStack* obj = new MyStack();
    obj->push(1);
    obj->push(2);
    obj->push(3);
    int param_2 = obj->pop();//3
    int param_3 = obj->top();//1
    bool param_4 = obj->empty();
    cout << param_2 << param_3 << param_4 << endl;
    return 0;
}
```

#### **题解（单队列）**

> **一个队列在模拟栈弹出元素的时候只要将队列头部的元素（除了最后一个元素外） 重新添加到队列尾部，此时再去弹出元素就是栈的顺序了。**

```c++
class MyStack {
public:
    queue<int> q;//q2 用来备份
    MyStack() { }

    void push(int x) {
        q.push(x);
    }

    int pop() {
       int size = q.size();
       size--;
       while(size--){// 将队列头部的元素（除了最后一个元素外） 重新添加到队列尾部
            q.push(q.front());
            q.pop();
       }
       int res = q.front();//// 此时弹出的元素顺序就是栈的顺序了
       q.pop();
       return res;
    }

    int top() {
        return q.back();
    }

    bool empty() {
        return q.empty();
    }
};
```

<!-- tabs:end -->

## **🐋**20 有效括号【简单】【**栈**】

<!-- tabs:start -->

#### **题目**

给定一个只包括 `'('`，`')'`，`'{'`，`'}'`，`'['`，`']'` 的字符串 `s` ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

**示例 1：**

```
输入：s = "()"
输出：true
```

**示例 2：**

```
输入：s = "()[]{}"
输出：true
```

**示例 3：**

```
输入：s = "(]"
输出：false
```



**提示：**

- `1 <= s.length <= 104`
- `s` 仅由括号 `'()[]{}'` 组成

#### **题解**

```C++
#include<iostream>
#include<string>
#include<stack>
#include<unordered_map>

using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // 当我们遇到一个左括号时，我们会期望在后续的遍历中，有一个相同类型的右括号将其闭合。
        // 由于后遇到的左括号要先闭合，因此我们可以将这个左括号放入栈顶。

        // 当我们遇到一个右括号时，我们需要将一个相同类型的左括号闭合。
        // 此时，我们可以取出栈顶的左括号并判断它们是否是相同类型的括号。
        stack<char>c;
        unordered_map<char, char>symbol = {
            // 将 })] 作为key
            {')', '('},
            {']', '['},
            {'}', '{'}
        };
        if (s.size() == 0)
            return true;
        if (s.size() % 2 != 0)
            return false;
        for (auto el : s) {
        // count返回拥有比较等于指定参数 key 的关键的元素数，因为此容器不允许重复故为 1 或 0 。
            //// 如果c是 })], 则判断， 否则说明是({[ , 直接入栈
            if (symbol.count(el)) { // 将左括号入栈
                // c.top()左括号
                // symbol[el] 左括号
                if (c.empty() || c.top() != symbol[el])
                    return false;
                // 匹配的收 将栈顶移除(先进后出，栈顶是最接近 c 的左括号) 
                c.pop();
            }
            else
            {
                c.push(el);
            }
        }
        return c.empty();
    }
};

int main() {

    Solution s;
    string str = "({[]})";
    cout << s.isValid(str);
}
```

<!-- tabs:end -->

## 🐋1047. 删除字符串中的所有相邻重复项【简单】【**栈**】

<!-- tabs:start -->

#### **题目**

+ 给出由小写字母组成的字符串 `S`，**重复项删除操作**会选择两个相邻且相同的字母，并删除它们。

+ 在 S 上反复执行重复项删除操作，直到无法继续删除。

+ 在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

**示例：**

```
输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
```

**提示：**

1. `1 <= S.length <= 20000`
2. `S` 仅由小写英文字母组成。

#### **题解**

```c++
class Solution {
public:
    string removeDuplicates(string s) {
        string str;
        for (auto el : s)
        {
            // 每次循环按顺序对比，有则pop没有则push
            if (!str.empty() && str.back() == el) {
                str.pop_back();
            }
            else {
                str.push_back(el);
            }
        }
        return str;
    }
};
```

<!-- tabs:end -->

## 🐋150. 逆波兰表达式求值【中等】【**栈**】

<!-- tabs:start -->

#### **题目**

给你一个字符串数组 `tokens` ，表示一个根据 [逆波兰表示法](https://baike.baidu.com/item/逆波兰式/128437) 表示的算术表达式。

请你计算该表达式。返回一个表示表达式值的整数。

**注意：**

- 有效的算符为 `'+'`、`'-'`、`'*'` 和 `'/'` 。
- 每个操作数（运算对象）都可以是一个整数或者另一个表达式。
- 两个整数之间的除法总是 **向零截断** 。
- 表达式中不含除零运算。
- 输入是一个根据逆波兰表示法表示的算术表达式。
- 答案及所有中间计算结果可以用 **32 位** 整数表示。 

**示例 1：**

```
输入：tokens = ["2","1","+","3","*"]
输出：9
解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
```

**示例 2：**

```
输入：tokens = ["4","13","5","/","+"]
输出：6
解释：该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6
```

**示例 3：**

```
输入：tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
输出：22
解释：该算式转化为常见的中缀算术表达式为：
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```

**提示：**

- `1 <= tokens.length <= 104`
- `tokens[i]` 是一个算符（`"+"`、`"-"`、`"*"` 或 `"/"`），或是在范围 `[-200, 200]` 内的一个整数

**逆波兰表达式：**

逆波兰表达式是一种后缀表达式，所谓后缀就是指算符写在后面。

- 平常使用的算式则是一种中缀表达式，如 `( 1 + 2 ) * ( 3 + 4 )` 。
- 该算式的逆波兰表达式写法为 `( ( 1 2 + ) ( 3 4 + ) * )` 。

逆波兰表达式主要有以下两个优点：

- 去掉括号后表达式无歧义，上式即便写成 `1 2 + 3 4 + * `也可以依据次序计算出正确结果。
- 适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中

#### **题解**

```c++
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int>str;
        int n = tokens.size();
        for (int i = 0; i < n; i++)
        {
            string& token = tokens[i];
            // 如果是操作符则出栈做运算
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                int num1 = str.top(); 
                str.pop();
                int num2 = str.top(); 
                str.pop();
                // 计算表达式，将的出来的答案（数字）继续push到栈中
               /* if (tokens[i] == "+") str.push(num2 + num1);
                if (tokens[i] == "-") str.push(num2 - num1);
                if (tokens[i] == "*") str.push(num2 * num1);
                if (tokens[i] == "/") str.push(num2 / num1);*/
                switch (token[0])
                {
                    case '+':
                        str.push(num2 + num1);
                        break;
                    case '-':
                        str.push(num2 - num1);
                        break;
                    case '*':
                        str.push(num2 * num1);
                        break;
                    case '/':
                        str.push(num2 / num1);
                        break;
                }
            }
            else {// 如果是数字就进栈
                str.push(stoll(token));
            }
        }
        int res = str.top();
        str.pop();// 把栈里最后一个元素弹出（其实不弹出也没事）
        return res;
    }
};
```

<!-- tabs:end -->

## 🐋239.滑动窗口最大值【困难】【**队列**】

<!-- tabs:start -->

#### **题目**

给你一个整数数组 `nums`，有一个大小为 `k` 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 `k` 个数字。滑动窗口每次只向右移动一位。

返回 *滑动窗口中的最大值* 。

**示例 1：**

```
输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
输出：[3,3,5,5,6,7]
解释：
滑动窗口的位置                最大值
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

**示例 2：**

```
输入：nums = [1], k = 1
输出：[1]
```

**提示：**

- `1 <= nums.length <= 105`
- `-104 <= nums[i] <= 104`
- `1 <= k <= nums.length`

#### **单调队列实现**

```c++
class MyQueue { //单调队列（从大到小）
public:
    deque<int> que; // 使用deque来实现单调队列
    // 每次弹出的时候，比较当前要弹出的数值是否等于队列出口元素的数值，如果相等则弹出。
    // 同时pop之前判断队列当前是否为空。
    void pop(int value) {
        if (!que.empty() && value == que.front()) {
            que.pop_front();
        }
    }
    // 如果push的数值大于入口元素的数值，那么就将队列后端的数值弹出，直到push的数值小于等于队列入口元素的数值为止。
    // 这样就保持了队列里的数值是单调从大到小的了。
    void push(int value) {
        while (!que.empty() && value > que.back()) {
            que.pop_back();
        }
        que.push_back(value);

    }
    // 查询当前队列里的最大值 直接返回队列前端也就是front就可以了。
    int front() {
        return que.front();
    }
};
```

#### **题解（单调队列）**

```c++
#include<iostream>
#include<vector>
#include<deque>

using namespace std;

class Solution {
private:
    class MyQueue { //单调队列（从大到小）
    public:
        deque<int> que; // 使用deque来实现单调队列
        // 每次弹出的时候，比较当前要弹出的数值是否等于队列出口元素的数值，如果相等则弹出。
        // 同时pop之前判断队列当前是否为空。
        void pop(int value) {
            if (!que.empty() && value == que.front()) {
                que.pop_front();
            }
        }
        // 如果push的数值大于入口元素的数值，那么就将队列后端的数值弹出，直到push的数值小于等于队列入口元素的数值为止。
        // 这样就保持了队列里的数值是单调从大到小的了。
        void push(int value) {
            while (!que.empty() && value > que.back()) {
                que.pop_back();
            }
            que.push_back(value);

        }
        // 查询当前队列里的最大值 直接返回队列前端也就是front就可以了。
        int front() {
            return que.front();
        }
    };
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        MyQueue que;
        vector<int> result;
        for (int i = 0; i < k; i++) { // 先将前k的元素放进队列
            que.push(nums[i]);
        }
        result.push_back(que.front()); // result 记录前k的元素的最大值
        for (int i = k; i < nums.size(); i++) {
            que.pop(nums[i - k]); // 滑动窗口移除最前面元素
            que.push(nums[i]); // 滑动窗口前加入最后面的元素
            result.push_back(que.front()); // 记录对应的最大值
        }
        return result;
    }
};

int main()
{
    vector<int>nums = { 1,3,-1,-3,5,3,6,7 };
    int k = 3;
    Solution s;
    for (auto el : s.maxSlidingWindow(nums, k)) {
        cout << el << endl;
    }
}
```

#### **题解（暴力）**

```c++
// 超过了时间限制无法通过
#include<iostream>
#include<vector>

using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int>res;
        int max_val;
        int s = 0;
        //如何求一个区间里的最大值
        for (int i = k-1; i < nums.size(); i++,s++)
        {
            max_val = nums[s];
            for (int j = s; j <= i; j++) {
                if (nums[j] > max_val) {
                    max_val = nums[j];
                }
            }
            res.push_back(max_val);
        }
        return  res;
    }
};

int main()
{
    vector<int>nums = { 1,3,-1,-3,5,3,6,7 };
    int k = 3;
    Solution s;
    for (auto el : s.maxSlidingWindow(nums, k)) {
        cout << el << endl;
    }
}
```

<!-- tabs:end -->

## 🐋347. 前 K 个高频元素【中等】【**小顶堆**】

<!-- tabs:start -->

#### **题目**



#### **题解（优先级队列）**

```c++

```

<!-- tabs:end -->
