[LeetCode练习](https://github.com/zjxWeb/leetcode)
<!-- tabs:start -->

#### **ASCII码表**

![ASCII](./src/img/ASCII.jpg)

#### **C++常用刷题技巧**

> 参考博客：https://www.yuque.com/jackyao/ifeq8i/vyigt9?

> 自带的宏常量

```cpp
// 建议使第三个，一二容易造成溢出
int N = INT_MIN; 
int N = INT_MAX;
const int INF = 0x3f3f3f3f; //通常用来代替最大值，防止运算过程中溢出
```

> 字符串判断函数

```cpp
isdigit(c)  //判断c字符是不是数字
isalpha(c)  //判断c字符是不是字母
isalnum(c)  //判断c字符是不是数字或者字母
tolower(c)  //转为小写
toupper(c)  //转为大写
isupper()  // 判断是否是大写
islower()	// 判断是否是小写
```

> 字符串和数值间的转换

```cpp
int num = 100;
string str = to_string(num); //整形转字符串
int number = stoi(str);  //字符串转为整形 stol()是字符串转为长整形
```

> 字符串和数值间的转换

```cpp
int num = 100;
string str = to_string(num); //整形转字符串
int number = stoi(str);  //字符串转为整形 stol()是字符串转为长整形
```

> 迭代器的二分

```cpp
vector<int> nums{1,2,34,44,99};
int k = lower_bound(nums.begin(), nums.end(), 56) - nums.begin(); //第一个大于等于目标值的迭代器位置
int k = upper_bound(nums.begin(), nums.end(), 56) - nums.begin(); // 找到第一个大于目标值的迭代器位置
```

> 字符串转为小写

```cpp
transform(str.begin(), str.end(), str.begin(), ::tolower());
```

> 小根堆

```cpp
priority_queue<int> pq; //默认是大根堆
priority_queue<int, vector<int>, greater<int>> pq; //小根堆
```

> 快速初始化数组

```cpp
// 注意：这个函数是按字节初始化的
memset(nums, 0, sizeof nums);
memset(nums, -1, sizeof nums);
memset(nums, 0x3f, sizeof nums);
```

> C++11的特性

```cpp
auto p = new ListNode(); // auto 关键字
Node* pre = nullptr   // nullptr代替NULL
unordered_map<int,int> mp; //哈希表 内部是无序的
unordered_set<int> st; //无序集合
```

> bitset

```cpp
uint32_t reverseBits(uint32_t n) {
    string s = bitset<32>(n).to_string();
    reverse(s.begin(), s.end());
    return bitset<32>(s).to_ulong();
}
```

> 字符串分割[将字符串按照空格分割]

```cpp
string s = "hello world my name is yao jun";
stringstream ss(s);
string str;
int cnt = 0;
while(ss >> str){
    cnt++;
    cout<<str<<endl;
}
cout<<cnt<<endl;
```

```txt
执行结果：
hello
world
my
name
is
yao
jun
7
```

> 四舍五入保留小数

```cpp
char str[10];
double num = 22.23434;
sprintf(str, "%.2f", num);
string s = str;
cout<<s<<endl;
```

```txt
执行结果
22.23
```

+ [2288. 价格减免](https://leetcode.cn/problems/apply-discount-to-prices/)

```cpp
class Solution {
public:
    string discountPrices(string sentence, int discount) {
        double d = 1 - discount / 100.0;
        stringstream ss(sentence);
         string res,w;
        while(ss >> w){
            if(!res.empty()) res += ' ';
            if(w.length() >1 && w[0] == '$' && all_of(w.begin()+1,w.end(),::isdigit)){
                stringstream s;
                //字符串 w 中除第一个字符外的剩余部分转换为长整型，并乘以 d 后，以保留两位小数的浮点数形式输出，输出时前面加上 '$' 符号。
                s << fixed << setprecision(2) << '$' << stoll(w.substr(1)) * d;
                res += s.str();
            }
            else res += w;
        }
        return res;
    }
};  
```

> 字符串按格式拆分

```cpp
string a = "12:59:36";
char str2[100];
memcpy(str2, a.c_str(), strlen(a.c_str()));
int u, v, w;
sscanf(str2, "%d:%d:%d", &u, &v, &w);
cout<<u<<" "<<v<<" "<<w<<endl;
```

```txt
执行结果：
12 59 36
```

> 相同字符的字符串

```cpp
string s(10, 'a');
cout<<s<<endl;
```

```txt
执行结果:
aaaaaaaaaa
```

> 结构体排序

```cpp
struct node{
    int a, b;
    // 从小到大排序
    bool operator < (const node& node_)const{
        if(a != node_.a) return a < node_.a;
        return b < node_.b;
    }
};
int main(){
    vector<node> tt;
    tt.push_back({1,5});
    tt.push_back({2,3});
    sort(tt.begin(), tt.end());
    for(auto &node: tt){
        cout<<node.a<<" "<<node.b<<endl;
    }
    return 0;
}
```

```txt
执行结果：
1 5
2 3
```

> 优先队列自定义排序

```cpp
struct node{
    int a, b;
    // 在优先队列中，跟排序的规则是反的，这里是指a大的排在前面，a相同时，b大的排在前面
    bool operator < (const node& node_)const{
        if(a != node_.a) return a < node_.a;
        return b < node_.b;
    }
};
int main(){
    priority_queue<node> pq;
    pq.push({1,5});
    pq.push({2,3});
    pq.push({2,5});
    while(!pq.empty()) {
        cout<<pq.top().a<<" "<<pq.top().b<<endl;
        pq.pop();
    }
    return 0;
}
```

```txt
执行结果
2 5
2 3
1 5
```

#### **ACM形式的刷题技巧**

```cpp
#include <bits/stdc++.h>
using ll = long long;
typedef unsigned long long ull;
using namespace std;
int main(){
	ios::sync_with_stdio(0), cin.tie(0), cout.tie(0);
}
```

> acm形式的刷题技巧可以参考如下

```cpp

#include <bits/stdc++.h>
 
#define endl '\n'
using ll = long long;
typedef unsigned long long ull;
using namespace std;
 
void GordenGhost();
 
signed main() {
#ifdef Gorden
    freopen("in.txt", "rt", stdin);
    freopen("out.txt", "wt", stdout);
#endif
    ios::sync_with_stdio(false);//将C++标准输入输出流与C语言的输入输出流分离，使得它们可以独立工作
    /*
        这两个函数分别将cin与cout的绑定关系解除。具体解释如下：
        cin.tie(nullptr): 该行代码将cin（标准输入流）的tie关系设置为nullptr，
            意味着不再自动刷新关联的输出流（默认是cout）
            每当从cin读取之前。这可以提升程序效率，避免不必要的输出缓冲区刷新。

        cout.tie(nullptr): 同样地，这一行将cout（标准输出流）的tie关系设为nullptr，
            断开与任何输入流的关联，防止在写入cout前自动刷新输入流
            （尽管默认情况下cout没有被其他输入流tie）
     */
    cin.tie(nullptr), cout.tie(nullptr);
    int t;
    cin>>t;
    while (t--)
        GordenGhost();
    return 0;
}
 
void GordenGhost() {
    ll n,ma=-1;
    cin>>n;
    vector<ll>w(n),q(n);
    for (int i = 0; i < n - 1; ++i) {
        cin>>w[i];
        ma= max(ma,w[i]);
    }
    for (int i = 0; i < n; ++i) {
        if (!i)q[i]=ma+1;
        else {
            q[i]=q[i-1]+w[i-1];
        }
    }
    for (auto i : q)cout<<i<<' ';
    cout<<endl;
}
```

> ```cpp
> #include <bits/stdc++.h>
> #define endl '\n'
> 
> using namespace std;
> 
> int minConcatenation(const string& tar,const vector<string>& container){
>     vector<int> dp(tar.size()+1,INT_MAX);
>     dp[0] = 0;
>     for(int i = 1;i <= tar.size();i++){
>         for(const string& str : container){
>             if(i >= str.size() && dp[i-str.size()] !=INT_MAX && tar.substr(i-str.size(),str.size()) == str){
>                 dp[i] = min(dp[i],dp[i-str.size()]+1);
>             }
>         }
>     }
>     return dp[tar.size()] == INT_MAX ? -1 : dp[tar.size()];
> }
> 
> 
> int main(){
>     ios::sync_with_stdio(false);
>     string tar;
>     cin >> tar;
>     int m; cin >> m;
>     vector<string> container(m);
>     for(int i = 0; i < m;i++) cin >> container[i];
>     cout << minConcatenation(tar,container) << endl;
> }
> ```

#### **滑动窗口**

```cpp
// 模板
int left = 0,right = 0;
while(right < s.size()){
    // 增大窗口
    window.add(s[right]);
    right++;
    while(window needs shrink){
        // 缩小窗口
        window.remove(s[left]);
        left++;
	}
}

/* 滑动窗口算法框架 */
void slidingWindow(string s) {
    // 用合适的数据结构记录窗口中的数据
    unordered_map<char, int> window;
    
    int left = 0, right = 0;
    while (right < s.size()) {
        // c 是将移入窗口的字符
        char c = s[right];
        window.add(c)
        // 增大窗口
        right++;
        // 进行窗口内数据的一系列更新
        ...

        /*** debug 输出的位置 ***/
        // 注意在最终的解法代码中不要 print
        // 因为 IO 操作很耗时，可能导致超时
        printf("window: [%d, %d)\n", left, right);
        /********************/
        
        // 判断左侧窗口是否要收缩
        while (left < right && window needs shrink) {
            // d 是将移出窗口的字符
            char d = s[left];
            window.remove(d)
            // 缩小窗口
            left++;
            // 进行窗口内数据的一系列更新
            ...
        }
    }
}

```

> 环形链表 	[503. 下一个更大元素 II](https://leetcode.cn/problems/next-greater-element-ii/description/)

```cpp
int arr[] = {1,2,3,4,5};
int n = sizeof(arr) / sizeof(arr[0]), index = 0;
while (true) {
    // 在环形数组中转圈
    cout << arr[index % n] << endl;
    index++;
}
```

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
> N皇后

```cpp
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> ans;// 记录结果
        vector<int>path(n);// 记录路径上的数
        vector<int>on_path(n);// 记录未选的数
        vector<int>diag1(2 * n - 1);// r +c 
        vector<int>diag2(2 * n - 1);// r - c
        // dfs
        function<void(int)> dfs = [&](int k){
            if(k == n){
                vector<string> board(n);// 记录棋盘
                for(int i = 0; i < n; ++i)board[i] = string(path[i],'.') + 'Q' + string(n - 1 - path[i],'.');
                ans.push_back(board);
                return;
            }
            for(int j = 0; j < n; j++){
                if(!on_path[j] && !diag1[k + j] &&!diag2[k - j + n -1]){ // k+j 右上 k-j 左上  n-1是为了避免负数
                    path[k] = j;
                    on_path[j] = diag1[k + j] = diag2[k - j + n -1] = true;
                    dfs(k+1);
                    on_path[j] = diag1[k + j] = diag2[k - j + n -1] = false;// 恢复现场
                }
            }
        };
        dfs(0);
        return ans;
    }
};
```

> [198. 打家劫舍](https://leetcode.cn/problems/house-robber/)

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
      // 1. 递归搜索 + 保存计算结果 = 记忆化搜索
        vector<int>memo(n,-1);// -1表示没有计算
        // dfs
        function<int(int)> dfs = [&](int i) -> int{
           if(i < 0) return 0; // 边界条件  没有房子
           if(memo[i]!= -1) return memo[i]; // 之前计算过
           return memo[i] = max(nums[i] + dfs(i-2), dfs(i-1));
        };
        return dfs(n-1);
    // 2. 1:1 翻译成递推
        vector<int>f(n+2);
        for(int i = 0; i < n; i++) f[i+2] = max(f[i+ 1] , f[i] + nums[i]);
        return f[n+1];
    // 空间优化
    // f0表示上一个  f1表示上上一个
        int f0 = 0, f1 = 0;
        for(auto el : nums){
            int new_f = max(f1, f0 + el);
            f0 = f1;
            f1 = new_f;
        }
        return f1;
    }
};
```

#### **并查集模板**

> 并查集是一种树型的数据结构，用于处理一些不相交集合的合并及查询问题（即所谓的并、查）。比如说，我们可以用并查集来判断一个森林中有几棵树、某个节点是否属于某棵树等。

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

#### **差分数组（前缀和的逆运算）**

> + **差分数组** —— 得主要使用场景是频繁对原始数组得某个区间得元素进行增减。
>
> + **前缀和**——主要适用得场景是原始数组不会被修改得情况下，频繁查询某个区间得累加和。

![2](./src/img/2c.png)

> 区间加

+ a = [0,0,0,0,0,0]要求给下标2到4的位置+2
  + 差分数组：0  0  2  0  0  -2 （修改起始位2，和结束的后一位4+1 = 5）
  + 前缀和：   0   0  2  2  2   0
+ ![3](./src/img/3c.png)

+ ![4](./src/img/4c.png)

> + 一维前缀和
>
>   + [303. 区域和检索 - 数组不可变](https://leetcode.cn/problems/range-sum-query-immutable/)
>
>   + ```cpp
>     class NumArray {
>     public:
>         vector<int>num;
>         NumArray(vector<int>& nums) {
>             int n = nums.size();
>             num.resize(n+1);
>             for(int i =0; i < n;i++){
>                 num[i+1] = num[i] + nums[i];
>             }
>         }
>         int sumRange(int left, int right) {
>             return num[right+1] - num[left];
>         }
>     };
>     ```
>
> + 二维前缀和
>
>   + [304. 二维区域和检索 - 矩阵不可变](https://leetcode.cn/problems/range-sum-query-2d-immutable/)
>
>   + ```cpp
>     class NumMatrix {
>         vector<vector<int>> sum;
>     public:
>         NumMatrix(vector<vector<int>>& matrix) {
>             int m = matrix.size(),n = matrix[0].size();
>             sum.resize(m+1, vector<int>(n+1));
>             for(int i = 0; i < m;i++){
>                 for(int j = 0; j < n;j++){
>                     sum[i+1][j+1] = sum[i+1][j] + sum[i][j+1] - sum[i][j]  + matrix[i][j];
>                 }
>             }
>         }
>                                                         
>         int sumRegion(int row1, int col1, int row2, int col2) {
>             return sum[row2+1][col2+1] - sum[row1][col2+1] - sum[row2+1][col1] + sum[row1][col1];
>         }
>     };
>     ```

> [1109. 航班预订统计](https://leetcode.cn/problems/corporate-flight-bookings/)
>
> ```cpp
> class Difference{
>     // 差分数组
>     vector<int> difference;
> public:
>     // 输入一个初始数组，区间操作将在这个数组上进行
>     Difference(vector<int> &a) {
>         int n = a.size();
>         difference.resize(n);
>         difference[0] = a[0];
>         for(int i = 1; i < n; ++i){
>             difference[i] = a[i] - a[i-1];
>         }
>     }
>     // 给闭区间[i,j] 增加 val 可能是负数
>     void increment(int i, int j, int val) {
>         difference[i] += val;
>         if(j + 1 < difference.size()) difference[j + 1] -= val;
>     }
> 
>     // 返回结果数组
>     vector<int> result() {
>         vector<int> res;
>         res.push_back(difference[0]);
>         for(int i = 1; i < difference.size(); ++i){
>             res.push_back(res[i-1] + difference[i]);
>         }
>         return res;
>     }
> };
> class Solution {
> public:
>     vector<int> corpFlightBookings(vector<vector<int>>& bookings, int n) {
>         // 初始化一个差分数组
>         vector<int> num(n,0);
>         Difference *df = new Difference(num);
>         for(auto & el : bookings){
>             int i = el[0] - 1;
>             int j = el[1] - 1;
>             int val = el[2];
>             df->increment(i,j,val);
>         }
>         return df->result();
>     }
> };
> ```
>
> 

> leetcode 1094.cpp  拼车

```c++
class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        // 差分数组(第一种写法)
        int a[1001]{};
        for(auto &el : trips){
            int num = el[0],from = el[1],to = el[2];
            a[from] += num;
            a[to] -= num;
        }
        int s= 0;
        for(int i= 0;i<1001;i++){
            s += a[i];
            if(s > capacity) return false;
        }
        return true;

        // 差分数组(第二种写法)
        map<int,int> m;
        for(auto &el : trips){
            int num = el[0],from = el[1],to = el[2];
            m[from] += num;
            m[to] -= num;
        }
        int s = 0;
        for(auto [_,vallue]: m){
            s += vallue;
            if(s > capacity) return false;
        }
        return true;
    }   
};
```

> [2536. 子矩阵元素加 1](https://leetcode.cn/problems/increment-submatrices-by-one/)**二维差分，二维前缀和**

```cpp
class Solution {
public:
    vector<vector<int>> rangeAddQueries(int n, vector<vector<int>>& queries) {
        vector<vector<int>> diff(n+2,vector<int>(n+2));
        // 二维差分模板
        for(auto &el : queries){
            int r1 = el[0],c1 = el[1],r2 = el[2],c2 = el[3];
            ++diff[r1 + 1][c1 + 1];
            --diff[r1 + 1][c2 + 2];
            --diff[r2 + 2][c1 + 1];
            ++diff[r2 + 2][c2 + 2];
        }
        // 用二维前缀和复原
        for(int i = 1; i <= n; ++i){
            for(int j = 1; j <= n; ++j){
                diff[i][j] += diff[i][j-1] + diff[i-1][j] - diff[i-1][j-1];
            }
        }
        diff.pop_back(),diff.erase(diff.begin());
        for(auto &el : diff) el.pop_back(),el.erase(el.begin());
        return diff;
    }
};
```

>  一维差分的思想可以推广至二维

![5](./src/img/5c.png)

>  二维前缀和

![6](./src/img/6c.png)

+ 模板

```c++
class MatrixSum {
private:
    vector<vector<int>> sum;

public:
    MatrixSum(vector<vector<int>> &matrix) {
        int m = matrix.size(), n = matrix[0].size();
        // 注意：如果 matrix[i][j] 范围很大，需要使用 long long
        sum = vector<vector<int>>(m + 1, vector<int>(n + 1));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                sum[i + 1][j + 1] = sum[i + 1][j] + sum[i][j + 1] - sum[i][j] + matrix[i][j];
            }
        }
    }

    // 返回左上角在 (r1,c1) 右下角在 (r2-1,c2-1) 的子矩阵元素和（类似前缀和的左闭右开）
    int query(int r1, int c1, int r2, int c2) {
        return sum[r2][c2] - sum[r2][c1] - sum[r1][c2] + sum[r1][c1];
    }

    // 如果你不习惯左闭右开，也可以这样写
    // 返回左上角在 (r1,c1) 右下角在 (r2,c2) 的子矩阵元素和
    int query2(int r1, int c1, int r2, int c2) {
        return sum[r2 + 1][c2 + 1] - sum[r2 + 1][c1] - sum[r1][c2 + 1] + sum[r1][c1];
    }
};
```

> 2132 用邮票贴满网格图

```c++
class Solution {
public:
    bool possibleToStamp(vector<vector<int>>& grid, int stampHeight, int stampWidth) {
        // 先计算前缀和
        int n = grid.size(),m = grid[0].size();
        // 定义前缀和数组
        vector<vector<int>> sum(n+1,vector<int>(m+1));
        for (int i = 0; i < n; i++){
            for(int j = 0;j < m;j++){
                sum[i+1][j+1] = sum[i+1][j]+sum[i][j+1]-sum[i][j]+grid[i][j];
            }
        }
        // 差分数组
        // 为方便第 3 步的计算，在 d 数组的最上面和最左边各加了一行（列），所以下标要 +1
        vector<vector<int>> d(n+2,vector<int>(m+2));
        for(int i = stampHeight;i < n+1;i++){
            for(int j = stampWidth;j < m+1;j++){
                int h = i - stampHeight + 1;
                int w = j - stampWidth + 1;
                // 判断子矩阵能不能放邮票
                if(sum[i][j] - sum[i][w-1] - sum[h-1][j] + sum[h-1][w-1] == 0){
                    d[h][w]++;
                    d[h][j+1]--;
                    d[i+1][w]--;
                    d[i+1][j+1]++;
                }
            }
        }
        // 还原差分矩阵
        for(int i = 0;i < n;i++){
            for(int j = 0; j < m;j++){
                d[i+1][j+1] += d[i+1][j] + d[i][j+1] - d[i][j];
                if(grid[i][j] == 0 && d[i+1][j+1] == 0) return false;
            }
        }
        return true;
    }
};
```

#### **二维转一维（一次二分）**

```c++
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
         int n = matrix.size(),m = matrix[0].size();
        int l = 0,r = n * m - 1;
        while(l <= r){
            int mid = l + ((r - l) >> 1);
            int row = mid / m, col = mid % m;
            if(matrix[row][col] == target) return true;
            else if(matrix[row][col] > target) r = mid - 1;
            else l = mid + 1;
        }
        return false;
    }
};
```

#### **lazy线段树**
> 问题： 一个数组，更新一个子数组的值（都加上一个数、把子数组内的元素取反）    查询一个子数组的值（求和，求最大值）

+ 两大思想
    1. 挑选O(n) 个特殊区间，使得任意一个区间可以拆分为 O(log n) 个特殊区间(用最近公共祖先来思考)  O(n) <= 4n
    
      + 挑选O(n)个特殊区间：build  参数：结点的编号；左端点值；右端点的值；
  
    2. lazy更新/延迟更新

       + lazy tag：用一个数组维护每个区间需要更新的值
       + 如果这个值 = 0（不一定是0，按题目来），表示不需要更新
       + 如果这个值 != 0,表示更新操作在这个区间停住了，不需要递归更新子区间了。
       + 如果后面又来了一个更新，破坏了有lazy tag的区间，那么这个区间就得继续递归更新

```c++

   int n = nums1.size();
   vector<int> todo(4*n,0);
   void build(vector<int> &a, int o, int l, int r) {
        if (l == r) {
            cnt1[o] = a[l - 1];
            return;
        }
        int m = (l + r) / 2; // 取中点
        build(a, o * 2, l, m); // 左儿子
        build(a, o * 2 + 1, m + 1, r); // 右儿子
        // 维护
    }

    // 更新 [L,R]   o,l,r=1,1,n
    void update(int o, int l, int r, int L, int R, int add) {
        if (L <= l && r <= R) { // 区间被包含了
            // 更新……
            todo[o] += add;// 不在继续递归更新
            return;
        }
        int m = (l + r) / 2;

        // 破坏了就要更新
        // 需要继续递归，就把todo[o]得内容传下去（给左右儿子）
        if (todo[o] != 0){
            todo[o*2] += todo[o];//left
            todo[o*2+1] += todo[o];// right
            todo[o] = 0; // 清空
        }

        // 有交集
        if (m >= L) update(o * 2, l, m, L, R, add);
        if (m < R) update(o * 2 + 1, m + 1, r, L, R, add);
        // 维护操作
    }
```
#### **快速幂**

> [50. Pow(x, n)](https://leetcode.cn/problems/powx-n/)

```cpp

class Solution {
public:
    double myPow(double x, int n) {
        if(x == 0.0)return 0.0;
        double res = 1.0;
        long b = n;
        if(b < 0){
            x = 1.0 / x;
            b = -b;
        }
        while(b > 0){
            if(b&1) res = res * x;
            x = x * x;
            b >>=1;
        }
        return res;
    }
};
```

> `(a*b) % p = [(a%p)*(b%p)] % p`

> 当指数是偶数的时候 2^4 = (2 ^ 2)^2
>
> 当指数是奇数的时候  2^3 = 2 * 2 ^ 2

#### **预处理回文数**

```c++
vector<int> pal;

auto init = [] {
    // 严格按顺序从小到大生成所有回文数（不用字符串转换）
    for (int base = 1; base <= 10000; base *= 10) {
        // 生成奇数长度回文数
        for (int i = base; i < base * 10; i++) {
            int x = i;
            for (int t = i / 10; t; t /= 10) {
                x = x * 10 + t % 10;
            }
            pal.push_back(x);
        }
        // 生成偶数长度回文数
        if (base <= 1000) {
            for (int i = base; i < base * 10; i++) {
                int x = i;
                for (int t = i; t; t /= 10) {
                    x = x * 10 + t % 10;
                }
                pal.push_back(x);
            }
        }
    }
    pal.push_back(1'000'000'001); // 哨兵，防止下面代码中的 i 下标越界
    return 0;
}();
```

#### **单调栈**

> 存在三种情况 
>
> - 情况一：当前遍历的元素T[i]小于栈顶元素T[st.top()]的情况
> - 情况二：当前遍历的元素T[i]等于栈顶元素T[st.top()]的情况
> - 情况三：当前遍历的元素T[i]大于栈顶元素T[st.top()]的情况

`只有单调栈递增（从栈口到栈底顺序），就是求右边第一个比自己大的，单调栈递减的话，就是求右边第一个比自己小的。`

> 每日温度

```c++
// 版本一
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& T) {
        // 递增栈
        stack<int> st;
        vector<int> result(T.size(), 0);
        st.push(0);
        for (int i = 1; i < T.size(); i++) {
            if (T[i] < T[st.top()]) {                       // 情况一
                st.push(i);
            } else if (T[i] == T[st.top()]) {               // 情况二
                st.push(i);
            } else {
                while (!st.empty() && T[i] > T[st.top()]) { // 情况三
                    result[st.top()] = i - st.top();
                    st.pop();
                }
                st.push(i);
            }
        }
        return result;
    }
};
```

> 直接把情况一二三都合并到了一起

```c++
// 版本二
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& T) {
        stack<int> st; // 递增栈
        vector<int> result(T.size(), 0);
        for (int i = 0; i < T.size(); i++) {
            while (!st.empty() && T[i] > T[st.top()]) { // 注意栈不能为空
                result[st.top()] = i - st.top();
                st.pop();
            }
            st.push(i);

        }
        return result;
    }
};
```

#### **优先队列/堆**

[优先队列](/study/c++/c++base/?id=_6-优先队列)

> 参考[347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)

```c++
class Solution {
public:
    // 小顶堆
    class mycomparison {
    public:
        bool operator()(const pair<int, int>& lhs, const pair<int, int>& rhs) {
            return lhs.second > rhs.second;
        }
    };
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // 统计出现的次数
        unordered_map<int, int> m;
        for (int i = 0; i < nums.size(); i++) m[nums[i]]++;
        priority_queue<pair<int, int>, vector<pair<int, int>>, mycomparison> q;
        for (auto it = m.begin(); it!= m.end(); it++) {
            q.push(make_pair(it->first, it->second));
            if (q.size() > k) q.pop();
        }
        // 找出前k个，倒序输出
        vector<int> res;
        while (!q.empty()) {
            res.push_back(q.top().first);
            q.pop();
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

#### **位运算总结**

> C++ int 是signed  所以说 `i >= 0` 和 `~i` 是等价的

+ [异或运算](https://leetcode.cn/problems/single-number/solutions/242211/zhi-chu-xian-yi-ci-de-shu-zi-by-leetcode-solution/)

> 1. 任何数和0做异或运算，结果仍然是原来的数，即 `a ⊕ 0 = a`
> 2. 任何数和其自身做异或运算，结果是 0，即  `a ⊕ a = 0`
> 3. 异或运算满足交换律和结合律，即 `a⊕b⊕a=b⊕a⊕a=b⊕(a⊕a)=b⊕0=b`

+ [集合与集合](https://leetcode.cn/circle/discuss/CaOJ45/)

  + 其中 `&`表示按位与，`∣` 表示按位或，`⊕` 表示按位异或，`∼` 表示按位取反。

  + 其中「对称差」指仅在其中一个集合的元素。

| 术语       | 集合               | 位运算                    | 举例                          | 距离                                |
| :--------- | ------------------ | ------------------------- | ----------------------------- | ----------------------------------- |
| 交集       | *A* ∩  *B*         | *a* & *b*                 | {0,2,3} ∩  {0,1,2} = {0,2}    | 1101 &  0111  =  0101               |
| 并集       | A U B              | a  \|  b                  | {0,2,3} U {0,1,2} = {0,1,2,3} | 1101  \|   0111 = 1111              |
| 对称差     | *A* Δ *B*          | *a*⊕*b*                   | {0,2,3} Δ {0,1,2}  = {1,3}    | 1101   ⊕  0111  = 1010              |
| 差         | *A* ∖ *B*          | *a* &∼*b*                 | {0,2,3}  ∖  {1,2}  = {0,3}    | 1101  &  1001  = 1001               |
| 差（子集） | *A*∖*B*（*B*⊆*A*） | *a*⊕*b*                   | {0,2,3} \ {0,2} = {3}         | 1101 ⊕  0101 = 1000                 |
| 包含于     | *A*⊆*B*            | a & b = a<br />a \| b = b | {0,2}⊆{0,2,3}                 | 0101&1101=0101<br/>0101 ∣ 1101=1101 |

> + 注 1：按位取反的例子中，仅列出最低 4 个比特位取反后的结果，即 0110 取反后是1001。
> + 注 2：包含于的两种位运算写法是等价的，在编程时只需判断其中任意一种。
> + 注 3：编程时，请注意运算符的优先级。例如 == 在某些语言中优先级更高。

+ 集合与元素

> + 通常会用到移位运算。
> + 其中 << 表示左移，>> 表示右移。
>
> 注：左移 i 位相当于乘 2^i，右移 *i* 位相当于除 2^*i*。

![8](./src/img/8.png)

```
      s = 101100
    s-1 = 101011 // 最低位的 1 变成 0，同时 1 右边的 0 都取反，变成 1
s&(s-1) = 101000
```

> 此外，某些数字可以借助标准库提供的函数算出：

| 术语                                   | Python                  | Java                                 | C++                     | Go                      |
| -------------------------------------- | ----------------------- | ------------------------------------ | ----------------------- | ----------------------- |
| 集合大小（元素个数）                   | `s.bit_count()`         | `Integer.bitcount(s)`                | `__builtin_popcount(s)` | `bits.OnesCount(s)`     |
| 二进制长度（减一得到集合中的最大元素） | `s.bit_length()`        | `32-Integer.numberOfLeadingZeros(s)` | `32-__builtin_clz(s)`   | `bits.Len(s)`           |
| 集合中的最小元素                       | `(s&-s).bit_length()-1` | `Integer.numberOfTrailingZeros(s)`   | `__builtin_ctz(s)`      | `bits.TrailingZeros(s)` |

> 特别地，只包含最小元素的子集，即二进制最低 11 及其后面的 00，也叫 lowbit，可以用 `s & -s` 算出。举例说明：

```
     s = 101100
    ~s = 010011
(~s)+1 = 010100 // 根据补码的定义，这就是 -s   最低 1 左侧取反，右侧不变
s & -s = 000100 // lowbit
```

+ 枚举集合

> 设元素范围从 0 到 *n*−1，从空集 ∅ 枚举到全集 *U*：

```python
for s in range(1 << n):
    # 处理 s 的逻辑
```

```java
for (int s = 0; s < (1 << n); s++) {
    // 处理 s 的逻辑
}
```

```c++
for (int s = 0; s < (1 << n); s++) {
    // 处理 s 的逻辑
}
```

```go
for s := 0; s < 1<<n; s++ {
    // 处理 s 的逻辑
}
```

> 设集合为 *s*，**从大到小**枚举 s* 的所有非空子集 sub：

```python
sub = s
while sub:
    # 处理 sub 的逻辑
    sub = (sub - 1) & s
```

```java
for (int sub = s; sub > 0; sub = (sub - 1) & s) {
    // 处理 sub 的逻辑
}
```

```c++
for (int sub = s; sub; sub = (sub - 1) & s) {
    // 处理 sub 的逻辑
}
```

```go
for sub := s; sub > 0; sub = (sub - 1) & s {
    // 处理 sub 的逻辑
}
```

> 为什么要写成 `sub = (sub - 1) & s` 呢？
>
> 如果要从大到小枚举 *s* 的所有子集 sub*sub*（从 *s* 枚举到空集 ∅），可以这样写：

```python
sub = s
while True:
    # 处理 sub 的逻辑
    sub = (sub - 1) & s
    if sub == s:
        break
```

```java
int sub = s;
do {
    // 处理 sub 的逻辑
    sub = (sub - 1) & s;
} while (sub != s);
```

```c++
int sub = s;
do {
    // 处理 sub 的逻辑
    sub = (sub - 1) & s;
} while (sub != s);
```

```go
for sub := s; ; {
    // 处理 sub 的逻辑
    sub = (sub - 1) & s
    if sub == s {
        break
    }
}
```

#### **`BFS/DFS`**

> `BFS`
>
> + `BFS`使用队列（`queue`）来实现，整个过程也可以看做一个倒立的树形：
>   1. 把根节点放到队列的末尾。
>   2. 每次从队列的头部取出一个元素，查看这个元素所有的下一级元素，把它们放到队列的末尾。并把这个元素记为它下一级元素的前驱。
>   3. 找到所要找的元素时结束程序。
>   4. 如果遍历整个树还没有找到，结束程序。

```cpp
BFS()
{
	初始化队列
	while(队列不为空且未找到目标节点)
	{
		取队首节点扩展，并将扩展出的非重复节点放入队尾;
			必要时记住每个节点的父节点; 
	} 
}

void bfs(起始点)
{
	将起始点放入队列中;
	标记起点已访问;
	while(队列不为空)
	{
		访问队列中首元素x;
		删除队首元素;
		for(x所有相邻点)
		{
			if(该点未被访问过且合法)
				将该点加入队列末尾; 
		}
	}
	队列为空，广搜结束; 
} 



int BFS(Node start, Node target) {
    queue<Node> q; 
    set<Node> visited;
    
    q.push(start); 
    visited.insert(start);

    while (!q.empty()) {
        int sz = q.size();
        for (int i = 0; i < sz; i++) {
            Node cur = q.front();
            q.pop();
            if (cur == target)
                return step;
            for (Node x : cur.adj()) {
                if (visited.count(x) == 0) {
                    q.push(x);
                    visited.insert(x);
                }
            }
        }
    }
    // 如果走到这里，说明在图中没有找到目标节点
}

```

> [2415. 反转二叉树的奇数层](https://leetcode.cn/problems/reverse-odd-levels-of-binary-tree/)

```cpp
class Solution {
public:
    TreeNode* reverseOddLevels(TreeNode* root) {
        queue<TreeNode *> qu;
        qu.emplace(root);
        bool isOdd = false;
        while (!qu.empty()) {
            int sz = qu.size();
            vector<TreeNode *> arr;
            for (int i = 0; i < sz; i++) {
                TreeNode *node = qu.front();
                qu.pop();
                if (isOdd) {
                    arr.emplace_back(node);
                }
                if (node->left) {
                    qu.emplace(node->left);
                    qu.emplace(node->right);
                }
            }
            if (isOdd) {
                for (int l = 0, r = sz - 1; l < r; l++, r--) {
                    swap(arr[l]->val, arr[r]->val);
                }
            }            
            isOdd ^= true;
        }
        return root;
    }
};
```

> `DFS`
>
> 1.从根节点开始
>
> 2.放入一个节点（起始时放入的为根节点）
>
> 3.如果这个节点是第一次出现，则放入堆栈中
>
> 4.判断该节点的子节点是否搜索完成，
>
> ```txt
>     a.如果是则将该节点出栈,判断该栈是否为空
> 
>          a.1 若为空则结束
> 
>         a.2 若不为空则取栈顶元素，并回到第2步
> 
>     b.如果没有完成搜索，取未被搜索的根节点，并回到第2步
> ```

```cpp
void dfs(int num，......)//参数用来表示状态  
{  
    if(判断边界)  
    {  
        ...//根据题意添加  
        return;  
    }  
    if(越界或者是不合法状态)  
        return;  
    for(扩展方式)  //也可能是if根据题意使用适合的方式
    {  
        if(扩展方式所达到状态合法)  
        {  
            修改操作;//根据题意来添加  
            标记；  
            dfs（）；  
            (还原标记)；  
            //是否还原标记根据题意  
            //如果加上（还原标记）就是 回溯法  
        }  
    }  
}

```

```cpp
class Solution {
public:
    TreeNode* reverseOddLevels(TreeNode* root) {
        dfs(root->left, root->right, true);
        return root;
    }

    void dfs(TreeNode *root1, TreeNode *root2, bool isOdd) {
        if (root1 == nullptr) {
            return;
        }
        if (isOdd) {
            swap(root1->val, root2->val);
        }
        dfs(root1->left, root2->right, !isOdd);
        dfs(root1->right, root2->left, !isOdd);
    }
};
```

#### **Dijkstra**

> 模板

```cpp
class Graph {
    vector<vector<int>> g;
public:
    Graph(int n, vector<vector<int>> &edges) {
        // 邻接矩阵（初始化为无穷大，表示 i 到 j 没有边）
        g = vector<vector<int>>(n, vector<int>(n, INT_MAX / 2));
        for (auto &e: edges)
            g[e[0]][e[1]] = e[2]; // 添加一条边（输入保证没有重边）
    }

    void addEdge(vector<int> e) {
        g[e[0]][e[1]] = e[2]; // 添加一条边（输入保证这条边之前不存在）
    }

    // 朴素 Dijkstra 算法（适用于稠密图）
    int shortestPath(int start, int end) {
       int n = g.size();
       vector<int> dis(n, INT_MAX / 2),vis(n);// vis记录是否被访问过
       // 还没算出来，初始化为0
       dis[start] = 0;    
       while(true){// 中途会跳出来，
            // 找到当前最短路，去更新它的邻居的最短路
            // 根据数学归纳法，dis[x] 一定是最短路长度
            int x = -1;// 进行标记，-1表示这个点还没有被访问
            for(int i = 0; i < n; i++){
                if(!vis[i] && (x < 0 || dis[i] < dis[x]))
                    x = i;// 找到了最短路
            }
            if(x < 0 || dis[x] == INT_MAX/2) // 所有从 start 能到达的点都被更新了
                return -1;
            if(x == end)
                return dis[x];// 找到终点，提前退出
            vis[x]= true;// 标记，在后续的循环中无需反复更新 x 到其余点的最短路长度
            for(int y = 0; y < n;y++){
                dis[y] = min(dis[y], dis[x] + g[x][y]);
            }
       }
    }
};

```

[1976. 到达目的地的方案数](https://leetcode.cn/problems/number-of-ways-to-arrive-at-destination/)

```cpp
// 堆优化 Dijkstra（适用于稀疏图）
class Solution {
public:
    int countPaths(int n, vector<vector<int>> &roads) {
        vector<vector<pair<int, int>>> g(n); // 邻接表
        for (auto &r : roads) {
            int x = r[0], y = r[1], d = r[2];
            g[x].emplace_back(y, d);
            g[y].emplace_back(x, d);
        }

        vector<long long> dis(n, LLONG_MAX);
        dis[0] = 0;
        vector<int> f(n);
        f[0] = 1;
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
        pq.emplace(0, 0);
        while (true) {
            auto [dx, x] = pq.top();
            pq.pop();
            if (x == n - 1) {
                // 不可能找到比 dis[n-1] 更短，或者一样短的最短路了（注意本题边权都是正数）
                return f[n - 1];
            }
            if (dx > dis[x]) {
                continue;
            }
            for (auto &[y, d] : g[x]) { // 尝试更新 x 的邻居的最短路
                long long new_dis = dx + d;
                if (new_dis < dis[y]) {
                    // 就目前来说，最短路必须经过 x
                    dis[y] = new_dis;
                    f[y] = f[x];
                    pq.emplace(new_dis, y);
                } else if (new_dis == dis[y]) {
                    // 和之前求的最短路一样长
                    f[y] = (f[y] + f[x]) % 1'000'000'007;
                }
            }
        }
    }
};

```

```cpp
//朴素 Dijkstra（适用于稠密图）
class Solution {
public:
    int countPaths(int n, vector<vector<int>>& roads) {
        vector<vector<long long>>g(n,vector<long long>(n,LLONG_MAX /2));
        for(auto &el : roads){
            g[el[0]][el[1]] = el[2];
            g[el[1]][el[0]] = el[2];
        }
        vector<long long> dis(n,LLONG_MAX / 2);
        dis[0] = 0;
        vector<bool> vis(n),f(n);//f[i] 表示节点 0 到节点 i 的最短路个数。
        f[0]=0;
        while(true){
            int x = -1;
            for(int i = 0; i < n;i++){
                 if(!vis[i] && (x < 0 || dis[i] < dis[x]))
                    x = i;// 找到了最短路
            }
            if(x < 0 || dis[x] == LLONG_MAX/2) // 所有从 start 能到达的点都被更新了
                return -1;
            if(x == n - 1)
                return f[x];// 找到终点，提前退出
            vis[x]= true;// 标记，在后续的循环中无需反复更新 x 到其余点的最短路长度
            // dp
            for(int y = 0;y < n;y++){
                long long newDis = dis[x] + g[x][y];
                if(newDis < dis[y]){
                    dis[y] = newDis;
                    f[y] = f[x];
                }else if (newDis == dis[y])
                {
                    // 和之前求的最短路一样长
                    f[y] = (f[y] + f[x]) % 1'000'000'007;
                }
                
            }
        }
    }
};
```

#### **总结**

> 树
>
> + 二叉搜索树——对其进行中序遍历，得到的值序列是`递增有序`的

>  `INT_MAX` 和 `INT_MIN` 是 C++ 的两个预定义宏，代表了整型变量能够存储的最大正整数和最小负整数，分别为 `2147483647` 和 `-2147483648`。这两个宏在头文件 `<climits>` 中定义。`INT_MAX` 表示一个 `32` 位符号整数所能够表示的最大值，也就是 `2^31 − 1`，而 `INT_MIN` 则表示最小的负整数。这个值是相对于二进制补码表示法的，也就是说，负数的范围比正数大 1。

<!-- tabs:end -->

<!-- tabs:start -->

#### **概述**

> [912. 排序数组](https://leetcode.cn/problems/sort-an-array/)

![7](./src/img/7.png)

>注：下面对应方法的时间复杂度均代表平均时间复杂度
>稳定排序：如果 a 原本在 b 前面，且 a == b，排序之后 a 仍然在 b 前面。
>非稳定排序：如果 a 原本在 b 前面，且 a == b，排序之后 a 不一定在 b 前面。
>原地排序 / 非原地排序：区别在于是否 使用额外的数组 辅助排序

#### **冒泡排序**

> （Bubble Sort）（稳定排序）（超出时间限制）

+ 比较相邻元素，如果第一个比第二个大，则交换。

+ 时间复杂度`n^2`，空间复杂度1

代码：

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // bubbleSort
        int n = n  2 1; ++i) {
            bool flag = false;
            for (int j = 0; j < n - 1 - i; ++j) {
                if (nums[j] > nums[j + 1]) {
                    swap(nums[j], nums[j + 1]);
                    flag = true;
                }                 
            }
            if (flag == false) break; //无交换，代表当前序列已经最优 
        }
        return nums;
    }
};
```

#### **选择排序**

>  （Select Sort）（非稳定排序）（超出时间限制）

+ 依次给每个位置选择当前位置及以后最小的元素（交换当前元素与之后最小元素的位置）。

> 不稳定举例：
> 排序前：5, 5*, 1, 7
> 排序后：1, 5*, 5, 7

+ 时间复杂度n^2，空间复杂度1

代码：

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // selectSort 选择排序
        int minIndex;
        int n = nums.size();
        for (int i = 0; i < n - 1; ++i) {
            minIndex = i;
            for (int j = i + 1; j < n; ++j) {
                if (nums[j] < nums[minIndex]) {
                    minIndex = j;
                }
            }
            swap(nums[i], nums[minIndex]);
        }
        return nums;
    }
};
```

#### **插入排序**

> （Insect Sort）（稳定排序）（超出时间限制）
> 在前 0 ~ i - 1 元素有序的情况下，（依次）将第 i 个元素插入前面已经有序的小序列，使其有序。

+ 时间复杂度`n^2`，空间复杂度1

代码：

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // insertSort 插入排序
        int n = nums.size();
        // 第一个元素被认为已经被排序
        for (int i = 1; i < n; ++i) {
            // 两元素递增排序，则直接插入
            if (nums[i] >= nums[i - 1]) continue;
            // nums[i] < nums[i - 1]
            // 二分查找，时间复杂度logn
            int l = 0, r = i - 1;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                // r右侧元素均大于 nums[i]，即 r 及其左侧元素均小于等于nums[i]
                if (nums[i] < nums[mid]) r = mid - 1; 
                else l = mid + 1; 
            }
            int index = r + 1; // 稳定排序，依次排列
            // 将当前 i 元素插入在 index 位置，index ~ i - 1 元素依次后移，时间复杂度n
            int tmp = nums[i];
            for (int k = i; k >= index + 1; --k) {
                nums[k] = nums[k - 1]; // 依次后移一位
            }
            nums[index] = tmp;
        }
        return nums;
    }
};
```

#### **希尔排序**

> （Shell Sort）（非稳定排序）
> 改进的插入排序（优化：原数组的一个元素距离正确位置很远的情况）
> 先让间隔 h 的元素有序，在使得间隔为 h / 2，一直缩小，一直到 h = 1（此时数组有序）。

+ 时间复杂度介于nlogn和n^2之间，空间复杂度1

代码：

```c++
class Solution {
    void shellSort(vector<int>&nums, int gap, int i) {
        int j, tmp = nums[i];
        for (j = i - gap; j >= 0 && tmp < nums[j]; j -= gap) {
            // 依次后移
            nums[j + gap] = nums[j];
        }
        nums[j + gap] = tmp;
    }
public:
    vector<int> sortArray(vector<int>& nums) {
        int n = nums.size();
        // 分组，最开始时，间隔 gap 为数组的一半
        for (int gap = n / 2; gap >= 1 ; gap /= 2) {
            // 对各个分组进行插入分组
            for (int i = gap; i < n; ++i) {
                shellSort(nums, gap, i);
            }
        }
        return nums;
    }
};
```

#### **归并排序**

> （Merge Sort）（稳定排序）

+ 将无序数组拆分，排序后再合并成大的有序数组。

+ 时间复杂度nlogn，空间复杂度n

代码：

```C++
class Solution {
    vector<int> tmp;
    void mergeSort (vector<int>& nums, int l, int r) {
        if (l >= r) return; // 不需进行排列
        int mid = l + (r - l) / 2;
        // 自底向上
        mergeSort(nums, l, mid);
        mergeSort(nums, mid + 1, r);
        // 排序当前数组
        int i = l, j = mid + 1, pos = l;
        while (i <= mid && j <= r) {
            if (nums[i] <= nums[j]) {
                tmp[pos] = nums[i];
                ++i;
            } else {
                tmp[pos] = nums[j];
                ++j;
            }
            ++pos;
        }
        for (int k = i; k <= mid; ++k) {
            tmp[pos++] = nums[k];
        }
        for (int k = j; k <= r; ++k) {
            tmp[pos++] = nums[k];
        }
        copy(tmp.begin() + l, tmp.begin() + r + 1, nums.begin() + l);
    }
public:
    vector<int> sortArray(vector<int>& nums) {
        int n = nums.size();
        tmp = nums;
        surgeSort(nums, 0, n - 1);
        return nums;
    }
};

```

#### **快速排序**

> （Quick Sort）（非稳定排序）

+ 随机选取一个数（x = rand() % len + startIndex）作为基准；
+ 把比基准小的数交换到前面，比基准大的数交换到后面；
+ 对左右区间递归重复。

> 时间复杂度nlogn，空间复杂度logn

代码：

```C++
class Solution {
    void quickSort(vector<int>&nums, int startIndex, int endIndex) {
        if (startIndex >= endIndex) return;
        
        int x = rand() % (endIndex - startIndex + 1) + startIndex; // 基于随机的原则
        swap(nums[startIndex], nums[x]);
        int firstNum = nums[startIndex];
        
        int l = startIndex, r = endIndex;
        while (l < r) {
            // 从后往前走，将比第一个小的移到前面
            while (l < r && nums[r] >= firstNum) --r;
            if (l < r) {
                nums[l] = nums[r];
            }
            // 从前往后走，将比第一个大的移到后面
            while (l < r && nums[l] <= firstNum) ++l;
            if (l < r) {
                nums[r] = nums[l];
            }
        }
        nums[l] = firstNum;
        // 自顶向下
        quickSort(nums, startIndex, l - 1);
        quickSort(nums, l + 1, endIndex);
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        int n = nums.size();
        quickSort(nums, 0, n - 1);
        return nums;
    }
};

```

#### **堆排序**

> （Heap Sort）（非稳定排序）

+ 先在原先数组的基础上构造大根堆（时间复杂度nlogn）；
+ 再依次弹出最大元素（每次弹出的时间复杂度为logk，k为当前大根堆中元素数目）。

>  时间复杂度nlogn，空间复杂度1

代码：

```C++
class Solution {
    void buildMaxHeap(vector<int>& nums) {
        int n = nums.size();
        for (int i = (n - 1) / 2; i >= 0; --i) {
            maxHeapify(nums, i, n);
        }
    }

    void maxHeapify(vector<int>& nums, int i, int n) {
        while (i * 2 + 1 < n) {
            // 代表当前 i 节点的左右儿子；
            // 超出数组大小则代表当前 i 节点为叶子节点，不需要移位
            int lSon = 2 * i + 1;
            int rSon = 2 * i + 2;
            int large = i;
            if (lSon < n && nums[lSon] > nums[i]) large = lSon;
            if (rSon < n && nums[rSon] > nums[large]) large = rSon;

            if (large != i) {
                swap(nums[i], nums[large]);
                // 迭代判断对应子节点及其儿子节点的大小关系
                i = large;
            } else {
                break;
            }
        }
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        // heapSort 堆排序
        int n = nums.size();
        // 将数组整理成大根堆
        buildMaxHeap(nums);
        for (int i = n - 1; i >= 1; --i) {
            // 依次弹出最大元素，放到数组最后，当前排序对应数组大小 - 1
            swap(nums[0], nums[i]);
            --n;
            maxHeapify(nums, 0, n);
        }
        return nums;
    }
};
```

#### **计数排序**

> （Count Sort）（稳定排序）
>
> 创建数组 counts，用于统计原数组 nums 中各元素值的出现次数；
> 再依次将元素值赋值到 nums 中对应位置。

+ 计数排序，时间复杂度n + k，空间复杂度k（k = maxNum - minNum + 1）

代码：

```C++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // CountSort 计数排序
        int n = nums.size();
        int minNum = INT_MAX, maxNum = INT_MIN;
        // 找到数组中的最小和最大元素
        for (int i = 0; i < n; ++i) {
            if (nums[i] < minNum) minNum = nums[i];
            if (nums[i] > maxNum) maxNum = nums[i];
        }
        // 构造计数数组
        vector<int> counts(maxNum - minNum + 1, 0);
        for (int i = 0; i < n; ++i) {
            ++counts[nums[i] - minNum];
        }
        // 计数排序
        int index = 0;
        for (int i = 0; i < counts.size(); ++i) {
            while (counts[i] != 0) {
                nums[index++] = i + minNum;
                counts[i]--;
            }
        }
        return nums;
    }
};
```

#### **桶排序**

> （Bucket Sort）（稳定排序）

+ 将原数组的元素分到有限数量的桶里（大编号桶里的所有元素均大于小编号桶里的任意元素）；
+ 分别对每个桶进行排序；
+ 依次合并。

>  时间复杂度n + k，空间复杂度n + k（k为桶的数量）

代码：

```C++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // BucketSort 桶排序
        int n = nums.size();
        // 获取数组的最小值和最大值
        int maxNum = nums[0], minNum = nums[0];
        for (int i = 1; i < n; ++i) {
            if (nums[i] > maxNum) maxNum = nums[i];
            if (nums[i] < minNum) minNum = nums[i];
        }
        // 初始化桶
        int bucketNum = 5, bucketSize = (maxNum - minNum) / bucketNum + 1;
        vector<vector<int>> buckets(bucketNum, vector<int>(0));
        // 小至大分桶
        for (int num : nums) {
            int bucketIndex = (num - minNum) / bucketSize;
            buckets[bucketIndex].emplace_back(num);
        }
        // 桶内排序
        for (int i = 0; i < buckets.size(); ++i) {
            sort(buckets[i].begin(), buckets[i].end());
        }
        // 从桶中依次取数
        int index = 0;
        for (auto& bucket : buckets) {
            for (int num : bucket) {
                nums[index++] = num;
            }
        }

        return nums;
    }
};
```

#### **基数排序**

> （Radix Sort）（稳定排序）

+ 对数组中所有数依次按由低到高的位数进行多次排序；
+ 每次排序都基于上次排序的结果。
+ （相对位置顺序保持不变）

```tex
例：原始数组 1，23，21，11，32
第一次排序后 1，21，11，32，23
第二次排序后 1，11，21，23，32
```

>  时间复杂度n x k，空间复杂度k（k为最大元素的位数）

代码：

```C++
class Solution {
    vector<int> counts;
    void radixSort(vector<int>& nums, vector<int>& tmp, int divisor) {
        int n = nums.size();
        counts = vector<int>(10, 0);
        // 统计个、十、百、千、万上对应 0 ~ 9 的出现次数
        for (int i = 0; i < n; ++i) {
            int x = (nums[i] / divisor) % 10;
            if (x != 9) ++counts[x + 1];
        }
        // 前缀和
        for (int i = 1; i <= 9; ++i) {
            counts[i] += counts[i - 1];
        }
        // 从前向后赋值
        for (int i = 0; i < n; ++i) {
            int x = (nums[i] / divisor) % 10;
            tmp[counts[x]++] = nums[i];  
        }
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        // RadixSort 基数排序
        int n = nums.size();
        // 预处理，让所有的数都大于等于0
        for (int i = 0; i < n; ++i) {
            nums[i] += 50000; // 50000为最小可能的数组大小
        }
        // 找出最大的数字，并获得其最大位数
        int maxNum = nums[0];
        for (int i = 0; i < n; ++i) {
            if (nums[i] > maxNum) {
                maxNum = nums[i];
            }
        }
        int num = maxNum, maxLen = 0;
        while (num) {
            ++maxLen;
            num /= 10;
        }
        // 基数排序，低位优先
        int divisor = 1;
        vector<int> tmp(n, 0);
        for (int i = 0; i < maxLen; ++i) {
            radixSort(nums, tmp, divisor);
            swap(tmp, nums);
            divisor *= 10;
        }
        // 减去预处理量
        for (int i = 0; i < n; ++i) {
            nums[i] -= 50000;
        }
        return nums;
    }
};
```

<!-- tabs:end -->

## 刷题归纳

| [1631. 最小体力消耗路径](https://leetcode.cn/problems/path-with-minimum-effort/)<br />1. 二分法   2. 并查集  3.  最短路  【图论】 | [287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)<br />1. 双指针 2. 二分法（*） | [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)<br />1. 位操作（异或运算） |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [2454. 下一个更大元素 IV](https://leetcode.cn/problems/next-greater-element-iv/)<br />1. 单调栈（递减）+ 优先队列  2. 双单调栈 | [225. 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/)<br />`q.push(q.front());` | [232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)<br />双栈 `out.push(in.top());` |
| [2132. 用邮票贴满网格图](https://leetcode.cn/problems/stamping-the-grid/)<br />1. 二维差分数组和二维前缀和 | [1094. 拼车](https://leetcode.cn/problems/car-pooling/)<br />1. 一维差分数组和一维前缀和 |                                                              |
| [2415. 反转二叉树的奇数层](https://leetcode.cn/problems/reverse-odd-levels-of-binary-tree/)<br />1. BFS 2.  DFS | [166. 分数到小数](https://leetcode.cn/problems/fraction-to-recurring-decimal/)<br />1. 模拟除法 | [987. 二叉树的垂序遍历](https://leetcode.cn/problems/vertical-order-traversal-of-a-binary-tree/)<br />DFS+map(哈希表) |
| [462. 最小操作次数使数组元素相等 II](https://leetcode.cn/problems/minimum-moves-to-equal-array-elements-ii/)<br />1. 排序（但是有个小知识需要注意一下）<br />`ans += abs(nums[i] - nums[n/2]);` | [2967. 使数组成为等数数组的最小代价](https://leetcode.cn/problems/minimum-cost-to-make-array-equalindromic/)<br />1. 中位数 ；回文数；二分； | [103. 二叉树的锯齿形层序遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/)<br />1. BFS |
| [162. 寻找峰值](https://leetcode.cn/problems/find-peak-element/)<br />1. 二分查找 | [1901. 寻找峰值 II](https://leetcode.cn/problems/find-a-peak-element-ii/)<br />1. 二分查找 | [2583. 二叉树中的第 K 大层和](https://leetcode.cn/problems/kth-largest-sum-in-a-binary-tree/)<br />1. BFS |
| [394. 字符串解码](https://leetcode.cn/problems/decode-string/)<br />1. 递归 | [155. 最小栈](https://leetcode.cn/problems/min-stack/)<br />1. 辅助栈 | [347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)<br />1. 优先队列 2. 小顶堆 |
| [2866. 美丽塔 II](https://leetcode.cn/problems/beautiful-towers-ii/)<br />1. 单调栈 | [1671. 得到山形数组的最少删除次数](https://leetcode.cn/problems/minimum-number-of-removals-to-make-mountain-array/)<br />1. 动态规划 2. 二分法 |                                                              |
| [2788. 按分隔符拆分字符串](https://leetcode.cn/problems/split-strings-by-separator/)<br />1.  讨论 2. \#include<sstream>   字符串流相关操作 | [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)<br />位运算（^） | [912. 排序数组](https://leetcode.cn/problems/sort-an-array/)<br />十大排序算法 |
| [2765. 最长交替子数组](https://leetcode.cn/problems/longest-alternating-subarray/)<br />分组循环 | [2865. 美丽塔 I](https://leetcode.cn/problems/beautiful-towers-i/)<br />1. 枚举（枚举每一座塔作为最高塔，每一次向左右两边扩展）<br />2. 动态规划 + 单调栈 | [365. 水壶问题](https://leetcode.cn/problems/water-and-jug-problem/)<br />1. DFS 2. 贝祖定理 |
| [7. 整数反转](https://leetcode.cn/problems/reverse-integer/)`  res = res * 10 + x % 10;           x /= 10;` | [6. Z 字形变换](https://leetcode.cn/problems/zigzag-conversion/)<br />巧设flag | [2864. 最大二进制奇数](https://leetcode.cn/problems/maximum-odd-binary-number/) |
| [303. 区域和检索 - 数组不可变](https://leetcode.cn/problems/range-sum-query-immutable/)<br />一维前缀和（[视频讲解](https://www.bilibili.com/video/BV1NY4y1J7xQ/?spm_id_from=333.337.search-card.all.click&vd_source=97f1d2f43cfb254aee6535dca8f8f4ee)） | [304. 二维区域和检索 - 矩阵不可变](https://leetcode.cn/problems/range-sum-query-2d-immutable/)<br />**二维前缀和** | [1277. 统计全为 1 的正方形子矩阵](https://leetcode.cn/problems/count-square-submatrices-with-all-ones/)<br />**二维前缀和** |
| [2536. 子矩阵元素加 1](https://leetcode.cn/problems/increment-submatrices-by-one/)<br />二维差分；二维前缀和 | [2602. 使数组元素全部相等的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-make-all-array-elements-equal/)<br />前缀和（元素和）；二分；排序 | [2806. 取整购买后的账户余额](https://leetcode.cn/problems/account-balance-after-rounded-purchase/)<br />四舍五入<br />(i+ 5) / 10 * 10 |
| [50. Pow(x, n)](https://leetcode.cn/problems/powx-n/)<br />快速幂 | [100265. 素数的最大距离](https://leetcode.cn/problems/maximum-prime-difference/) <br />素数 | [3184. 构成整天的下标对数目 I](https://leetcode.cn/problems/count-pairs-that-form-a-complete-day-i/)<br />`res += cnt[(24 - el%24)%24];`<br />cnt[el%24]++;<br />[模运算](https://leetcode.cn/circle/discuss/mDfnkW/) |











