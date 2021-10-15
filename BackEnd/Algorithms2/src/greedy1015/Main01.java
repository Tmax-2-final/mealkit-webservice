package greedy1015;


import java.util.Arrays;
import java.util.Scanner;

// 큰수의 법칙
public class Main01 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int m = sc.nextInt();
        int k = sc.nextInt();

        int[] arr = new int[n];
        for(int i = 0 ; i < n ; i++) {
            arr[i] = sc.nextInt();
        }

        Arrays.sort(arr);

        int first = arr[n - 1];
        int second = arr[n - 2];

        int cnt = (m/(k+1)) * k;
        cnt += m%(k+1);

        int result = cnt * first;
        result += (m - cnt)  * second;

        System.out.println(result);

    }








}
