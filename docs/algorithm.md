<!-- tabs:start -->

[LeetCode练习](https://github.com/zjxWeb/leetcode)

#### **ASCII码表**

<img src="./src/img/ASCII.jpg"/>

#### **链表测试模板**
```C++
#include <iostream>

using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode* next1) : val(x), next(next1) {}
};
ostream& operator<<(ostream& os, ListNode* lp) {
    ListNode* cur = lp;
    while (cur != nullptr) {
        os << cur->val << " -> ";
        cur = cur->next;
    }
    os << "∅";
    return os << endl;
}
/**
* 24.两两交换链表中的节点【中等】【链表】
*/
//class Solution {
//public:
//    ListNode* swapPairs(ListNode* head) {
//        ListNode* fHead = new ListNode(0);
//        fHead->next = head;
//        ListNode* cur = fHead; // 记录当前节点
//        while (cur->next != nullptr && cur->next->next != nullptr)
//        {
//            ListNode* t1 = cur->next;
//            ListNode* t2 = cur->next->next;
//            ListNode* t3 = cur->next->next->next;
//            cur->next = t2;
//            cur->next->next = t1;
//            cur->next->next->next = t3;
//
//            // 移动cur准备下一次交换，
//            cur = cur->next->next;
//        }
//        return fHead->next;
//    }
//};

/**
* 19. 删除链表的倒数第 N 个结点
*/
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
int main(int argc, char* argv[]) {
    ListNode* head = new ListNode(1);
    ListNode* cur = head;
    for (auto& i : { 2, 3, 4 ,5}) {
        cur->next = new ListNode(i);
        cur = cur->next;
    }
    cout << head;
    // 这里就是题目中函数的调用了, 下面是一个示例(24题)
    /*
    Solution s;
    cout << s.swapPairs(head);
    */
    // 别忘了释放内存(虽然系统会帮我们释放)
    Solution s;
    int n = 2;
    cout << s.removeNthFromEnd(head,n);
    delete head;
    return 0;
}

```
#### **二叉树遍历完整版**

```c++
#include<iostream>
#include<vector>
#include<stack>

using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* left, TreeNode* right) : val(x), left(left), right(right) {}
};
// 前序遍历递归
//class Solution {
//public:
//    vector<int>res;
//    vector<int> preorderTraversal(TreeNode* root) {
//        if (root == NULL) return res;
//        res.push_back(root->val);
//        preorderTraversal(root->left);
//        preorderTraversal(root->right);
//        return res;
//    }
//};

//// 前序遍历迭代
//class Solution {
//public:
//    vector<int> preorderTraversal(TreeNode* root) {
//        stack<TreeNode*>sta;
//        vector<int>res;
//        if (root == NULL) return res;
//        sta.push(root);
//        while (!sta.empty()) {
//            TreeNode* node = sta.top();
//            sta.pop();
//            res.push_back(node->val);
//            if (node->right) sta.push(node->right);
//            if (node->left) sta.push(node->left);
//        }
//        return res;
//    }
//};

// 中序遍历
//class Solution {
//public:
//    vector<int>res;
//    vector<int> preorderTraversal(TreeNode* root) {
//        if (root == NULL) return res;
//        preorderTraversal(root->left);
//        res.push_back(root->val);
//        preorderTraversal(root->right);
//        return res;
//    }
//};
// 中序遍历迭代
//class Solution {
//public:
//    vector<int> preorderTraversal(TreeNode* root) {
//        stack<TreeNode*>sta;
//        vector<int>res;
//        TreeNode* cur = root;
//        while (cur != NULL || !sta.empty()) {
//            if (cur != NULL) {
//                sta.push(cur);
//                cur = cur->left;
//            }
//            else
//            {
//                cur = sta.top();
//                sta.pop();
//                res.push_back(cur->val);
//                cur = cur->right;
//            }
//        }
//        return res;
//    }
//};
// 后序遍历(递归)
//class Solution {
//public:
//    vector<int>res;
//    vector<int> preorderTraversal(TreeNode* root) {
//        if (root == NULL) return res;
//        preorderTraversal(root->left);
//        preorderTraversal(root->right);
//        res.push_back(root->val);
//        return res;
//    }
//};
// 后序遍历(迭代)
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        stack<TreeNode*>sta;
        vector<int>res;
        if (root == NULL) return res;
        sta.push(root);
        while (!sta.empty()) {
            TreeNode* node = sta.top();
            sta.pop();
            res.push_back(node->val);
            if (node->left) sta.push(node->left); // 相对于前序遍历，这更改一下入栈顺序 （空节点不入栈）
            if (node->right) sta.push(node->right); // 空节点不入栈
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
int main()
{
    Solution s;
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    for (auto el : s.preorderTraversal(root)) {
        cout << el << endl;
    }
}

```

#### **回溯模板**

```c++
void backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}
```
#### **并查集模板**
1. 定义数据结构

```c++
int fa[100010]; // fa[i]表示i的父亲
```

2. 定义查找函数

```c++
int find(int x){
	// 如果i的父亲是他自己，那么返回自己
	if(x==fa[x]) return x;
	// 如果不是的话
	else{
	// 找到他的父亲
	// 并且令他的父亲为他父亲的父亲
	// 即路径压缩
	fa[x]=find(fa[x]);
	// 返回他的父亲
	return fa[x];
}

```

> 进行简化

```c++
int find(int x){
	return fa[x]==x ? x : fa[x]=find(fa[x]);
}
```

3. 定义合并函数

```c++
void unity(int x,int y){
	// 将y的父亲指向x的父亲，即合并xy
	// 这里x和y可以互换位置，不影响最终结果
	fa[find(y)]=find(x);
}
```
<!-- tabs:end -->
