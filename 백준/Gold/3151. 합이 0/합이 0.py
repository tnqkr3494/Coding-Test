from bisect import bisect_left

N = int(input())
arr = list(map(int, input().split()))
arr.sort()

answer = 0
for i in range(len(arr)-2):
    left, right = i+1, N-1
    while left < right:
        result = arr[i]+arr[left]+arr[right]
        if result > 0:
            right -= 1
        else:
            if result == 0:
                if arr[left] == arr[right]:
                    answer += right - left
                else:
                    idx = bisect_left(arr, arr[right])
                    answer += right-idx+1
            left += 1

print(answer)