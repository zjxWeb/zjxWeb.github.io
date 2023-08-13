<!-- tabs:start -->
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
<!-- tabs:end -->
