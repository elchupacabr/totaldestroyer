using System;
using System.Collections.Generic;
using System.Deployment.Internal;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

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
                Regex regex = new Regex(@"[^0-9\.\-]");

                // Проверяем, является ли ввод числом
                if (int.TryParse(n, out int number))
                {
                    Console.WriteLine("Введённые данные является числами ");
                }
                else
                {
                    Console.WriteLine("Введённые данные не являются числом.");
                    Console.ReadKey();
                    System.Environment.Exit(0);
                }

                Console.Write("Введите количество столбцов (m): ");
                string m = Console.ReadLine();
                if (int.TryParse(m, out int number1))
                {
                    Console.WriteLine("Введённые данные является числами ");
                  
                }
                else
                {
                    Console.WriteLine("Введённые данные не являются числом.");
                    Console.ReadKey();
                    System.Environment.Exit(0);
                }

                // Создание матрицы
                double[,] matrix = new double[number, number1];

                // Ввод значений матрицы
                for (int i = 0; i < number; i++)
                {
                    for (int j = 0; j < number1; j++)
                    {
                       //bool isValid = false;
                        //do
                       //{
                            Console.Write($"Введите элемент [{i}, {j}]: ");
                            string input = Console.ReadLine();

                            // Проверяем, является ли ввод числом
                            if (double.TryParse(input, out double value))
                            {
                                matrix[i, j] = value;
                                //isValid = true;
                            }
                            else
                            {
                                Console.WriteLine("ошибка! некорректное заполнение");
                                Console.ReadKey();
                                System.Environment.Exit(0);
                            }
                        //} while (isValid);
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
                        matrix[j, i] = flatArray[k++];
                    }
                }
                // Вывод результата
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
