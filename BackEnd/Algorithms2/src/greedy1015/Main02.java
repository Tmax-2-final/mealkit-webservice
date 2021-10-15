package greedy1015;

import java.util.Scanner;

public class Main02 {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int m = sc.nextInt();
        int result = 0;

        for(int i = 0 ; i < n ; i++){
            int min_value = 10001;
            for(int j = 0 ; j <  m ; j++){
                int x = sc.nextInt();
                min_value = Math.min(min_value, x);
            }

            result = Math.max( result, min_value);
        }

        System.out.println(result);

    }
}
