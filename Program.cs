using System;
using System.Text.RegularExpressions;

namespace MyNamespace
{
    class Program
    {
        static void Main()
        {
            while (true)
            {
                Console.Write("Введите количество строк (n): ");
                string n = Console.ReadLine();

                if (!int.TryParse(n, out int number) || number <= 0)
                {
                    Console.WriteLine("Ошибка: введите положительное целое число для строк.");
                    continue;
                }

                Console.Write("Введите количество столбцов (m): ");
                string m = Console.ReadLine();

                if (!int.TryParse(m, out int number1) || number1 <= 0)
                {
                    Console.WriteLine("Ошибка: введите положительное целое число для столбцов.");
                    continue;
                }

                // Создание матрицы
                double[,] matrix = new double[number, number1];

                // Ввод значений матрицы с проверкой
                for (int i = 0; i < number; i++)
                {
                    for (int j = 0; j < number1; j++)
                    {
                        bool isValid = false;
                        do
                        {
                            Console.Write($"Введите элемент [{i}, {j}]: ");
                            string input = Console.ReadLine();

                            // Проверяем, является ли ввод числом
                            if (double.TryParse(input, out double value))
                            {
                                matrix[i, j] = value;
                                isValid = true;
                            }
                            else
                            {
                                Console.WriteLine("Ошибка: введите корректное число.");
                            }
                        } while (!isValid);
                    }
                }

                // Преобразование матрицы в одномерный массив
                double[] flatArray = new double[number * number1];
                int k = 0;
                for (int i = 0; i < number; i++)
                {
                    for (int j = 0; j < number1; j++)
                    {
                        flatArray[k++] = matrix[i, j];
                    }
                }

                // Сортировка массива
                Array.Sort(flatArray);

                // Заполнение матрицы отсортированными значениями
                k = 0;
                for (int i = 0; i < number; i++)
                {
                    for (int j = 0; j < number1; j++)
                    {
                        matrix[i, j] = flatArray[k++];
                    }
                }

                // Вывод отсортированной матрицы
                Console.WriteLine("\nМатрица после сортировки:");
                for (int i = 0; i < number; i++)
                {
                    for (int j = 0; j < number1; j++)
                    {
                        Console.Write($"{matrix[i, j]}\t");
                    }
                    Console.WriteLine();
                }
                Console.WriteLine();
                Console.ReadKey();
            }
        }
    }
}
