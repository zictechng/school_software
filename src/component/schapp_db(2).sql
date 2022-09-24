-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 24, 2022 at 09:38 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `schapp_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_sessions`
--

CREATE TABLE `academic_sessions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `academic_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `add_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `a_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `a_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `a_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `academic_sessions`
--

INSERT INTO `academic_sessions` (`id`, `academic_name`, `add_by`, `a_status`, `a_date`, `a_action`, `created_at`, `updated_at`) VALUES
(1, '2010/2020 Updated', 'Ken220', 'Deleted', '30/07/2022 14:30:34', NULL, '2022-07-30 13:30:34', '2022-07-30 14:28:21'),
(2, '2009/2010', 'Ken220', 'Deleted', '30/07/2022 15:27:53', NULL, '2022-07-30 14:27:53', '2022-07-30 16:01:57'),
(3, '2010/2011', 'Ken220', 'Deleted', '30/07/2022 15:28:06', NULL, '2022-07-30 14:28:06', '2022-07-30 16:01:56'),
(4, '2012/2013', 'Ken220', 'Deleted', '30/07/2022 15:28:16', NULL, '2022-07-30 14:28:16', '2022-07-30 16:01:54'),
(5, '2011/2012', 'Ken220', 'Active', '31/07/2022 14:23:36', NULL, '2022-07-31 13:23:36', '2022-07-31 13:23:36'),
(6, '2013/2014', 'Ken220', 'Active', '31/07/2022 14:24:17', NULL, '2022-07-31 13:24:17', '2022-07-31 13:24:17'),
(7, '2015/2016', 'Ken220', 'Deleted', '31/07/2022 14:24:37', NULL, '2022-07-31 13:24:37', '2022-09-09 17:59:28');

-- --------------------------------------------------------

--
-- Table structure for table `activitity_logs`
--

CREATE TABLE `activitity_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `m_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_details` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_date` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_uid` bigint(20) DEFAULT NULL,
  `m_device_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_broswer` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_device_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_city` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_currence` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_country_name` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_country_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_platform` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_deivce_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_latitude` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_longitude` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `m_record_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activitity_logs`
--

INSERT INTO `activitity_logs` (`id`, `m_username`, `m_action`, `m_status`, `m_details`, `m_date`, `m_uid`, `m_device_name`, `m_broswer`, `m_device_number`, `m_location`, `m_ip`, `m_city`, `m_currence`, `m_country_name`, `m_country_code`, `m_platform`, `m_deivce_type`, `m_latitude`, `m_longitude`, `m_record_id`, `created_at`, `updated_at`) VALUES
(1, 'vivian', 'Logout', 'Successful', 'Uwadia Vivian logout from the system', '24/09/2022 14:07:45', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 13:07:45', '2022-09-24 13:07:45'),
(2, 'vivian', 'Login', 'Successful', 'Uwadia Vivian, user login to account', '24/09/2022 14:07:52', 5, 'OS X', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', NULL, 'Destop/Laptop Device', NULL, NULL, NULL, '2022-09-24 13:07:52', '2022-09-24 13:07:52'),
(3, 'vivian', 'Logout', 'Successful', 'Uwadia Vivian logout from the system', '24/09/2022 14:12:03', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 13:12:03', '2022-09-24 13:12:03'),
(4, 'vivian', 'Login', 'Successful', 'Uwadia Vivian, user login to account', '24/09/2022 14:12:22', 5, 'OS X', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'Abuja', 'NGN', 'Nigeria', 'NG', NULL, 'Destop/Laptop Device', '9.05785', '7.49508', NULL, '2022-09-24 13:12:22', '2022-09-24 13:12:22'),
(5, 'vivian', 'Logout', 'Successful', 'Uwadia Vivian logout from the system', '24/09/2022 14:15:34', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 13:15:34', '2022-09-24 13:15:34'),
(6, 'vivian', 'Login', 'Successful', 'Uwadia Vivian, user login to account', '24/09/2022 14:15:43', 5, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'Abuja', 'NGN', 'Nigeria', 'NG', 'OS X', 'Destop/Laptop Device', '9.05785', '7.49508', NULL, '2022-09-24 13:15:43', '2022-09-24 13:15:43'),
(7, 'vivian', 'Logout', 'Successful', 'Uwadia Vivian logout from the system', '24/09/2022 14:40:49', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 13:40:49', '2022-09-24 13:40:49'),
(8, 'Ken220', 'Login', 'Successful', 'Ken Young, user login to account', '24/09/2022 14:40:59', 1, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', 'OS X', 'Destop/Laptop Device', '41.31', '-72.92', NULL, '2022-09-24 13:40:59', '2022-09-24 13:40:59'),
(9, 'Ken220', 'Logout', 'Successful', 'Ken Young logout from the system', '24/09/2022 14:41:13', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 13:41:13', '2022-09-24 13:41:13'),
(10, 'vivian', 'Login', 'Successful', 'Uwadia Vivian, user login to account', '24/09/2022 14:41:24', 5, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', 'OS X', 'Destop/Laptop Device', '41.31', '-72.92', NULL, '2022-09-24 13:41:24', '2022-09-24 13:41:24'),
(11, 'vivian', 'Logout', 'Successful', 'Uwadia Vivian logout from the system', '24/09/2022 14:42:55', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 13:42:55', '2022-09-24 13:42:55'),
(12, 'vivian', 'Login', 'Successful', 'Uwadia Vivian, user login to account', '24/09/2022 14:43:04', 5, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', 'OS X', 'Destop/Laptop Device', '41.31', '-72.92', NULL, '2022-09-24 13:43:04', '2022-09-24 13:43:04'),
(13, 'vivian', 'Logout', 'Successful', 'Uwadia Vivian logout from the system', '24/09/2022 14:51:08', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 13:51:08', '2022-09-24 13:51:08'),
(14, 'Ken220', 'Login', 'Successful', 'Ken Young, user login to account', '24/09/2022 14:52:48', 1, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', 'OS X', 'Destop/Laptop Device', '41.31', '-72.92', NULL, '2022-09-24 13:52:48', '2022-09-24 13:52:48'),
(15, 'Ken220', 'Logout', 'Successful', 'Ken Young logout from the system', '24/09/2022 14:53:03', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 13:53:03', '2022-09-24 13:53:03'),
(16, NULL, 'Login', 'Successful', 'SS/P/2022 user login to account', '24/09/2022 14:54:44', 7, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', 'OS X', 'Destop/Laptop Device', '41.31', '-72.92', NULL, '2022-09-24 13:54:44', '2022-09-24 13:54:44'),
(17, NULL, 'Login', 'Successful', 'SS/P/2022 user login to account', '24/09/2022 14:57:12', 7, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', 'OS X', 'Destop/Laptop Device', '41.31', '-72.92', NULL, '2022-09-24 13:57:12', '2022-09-24 13:57:12'),
(18, 'SS/P/2022', 'Logout', 'Successful', 'Peter Uwadia logout from the system', '24/09/2022 15:12:54', 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 14:12:54', '2022-09-24 14:12:54'),
(19, NULL, 'Login', 'Successful', 'SS/P/2022 user login to account', '24/09/2022 15:12:59', 7, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', 'OS X', 'Destop/Laptop Device', '41.31', '-72.92', NULL, '2022-09-24 14:12:59', '2022-09-24 14:12:59'),
(20, 'SS/P/2022', 'Logout', 'Successful', 'Peter Uwadia logout from the system', '24/09/2022 15:26:29', 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 14:26:29', '2022-09-24 14:26:29'),
(21, NULL, 'Login', 'Successful', 'SS/P/2022 user login to account', '24/09/2022 18:53:52', 7, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', 'OS X', 'Destop/Laptop Device', '41.31', '-72.92', NULL, '2022-09-24 17:53:52', '2022-09-24 17:53:52'),
(22, 'SS/P/2022', 'Logout', 'Successful', 'Peter Uwadia logout from the system', '24/09/2022 18:55:17', 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 17:55:17', '2022-09-24 17:55:17'),
(23, NULL, 'Login', 'Successful', 'SS/P/2022 user login to account', '24/09/2022 18:56:57', 7, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', 'OS X', 'Destop/Laptop Device', '41.31', '-72.92', NULL, '2022-09-24 17:56:57', '2022-09-24 17:56:57'),
(24, 'SS/P/2022', 'Logout', 'Successful', 'Peter Uwadia logout from the system', '24/09/2022 19:28:24', 7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-24 18:28:24', '2022-09-24 18:28:24'),
(25, 'Ken220', 'Login', 'Successful', 'Ken Young, user login to account', '24/09/2022 19:37:59', 1, 'Macintosh', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0', NULL, NULL, '127.0.0.1', 'New Haven', 'USD', 'United States', 'US', 'OS X', 'Destop/Laptop Device', '41.31', '-72.92', NULL, '2022-09-24 18:37:59', '2022-09-24 18:37:59');

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `other_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_level` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addby` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acct_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acct_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reg_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `first_name`, `other_name`, `phone`, `email`, `user_name`, `access_level`, `sex`, `addby`, `acct_status`, `acct_action`, `password`, `reg_date`, `created_at`, `updated_at`) VALUES
(1, 'Ben', 'loveth', '98989878778', 'ben@gmail.com', 'ben', '3', 'Female', 'Ken220', 'Active', NULL, '$2y$10$EZ.VaOPuMlyxD9ImDPId0ueci1gNFh/EadepN26JXCW6KUTHQVkza', '04/08/2022 18:02:40', '2022-08-04 17:02:40', '2022-08-29 11:43:18'),
(2, 'Ken', 'Developer', '08037250238', 'kendone@gmail.com', 'ken99', '1', 'Male', 'Ken220', 'Active', NULL, '$2y$10$4YS/gi4aaTF.Qg0sgp20tusTlBMYQS2XrHHpg6m5I0J1PaWOllBSS', '04/08/2022 18:04:01', '2022-08-04 17:04:01', '2022-08-04 17:58:06');

-- --------------------------------------------------------

--
-- Table structure for table `application_notifications`
--

CREATE TABLE `application_notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_body` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body_message` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `feature` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `feature_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `feature_thumbnail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `belong_to` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action_state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assigned_subjects`
--

CREATE TABLE `assigned_subjects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sub_teacher_id` bigint(20) DEFAULT NULL,
  `sub_subject_id` bigint(20) DEFAULT NULL,
  `sub_teacher_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_subject_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assigned_subjects`
--

INSERT INTO `assigned_subjects` (`id`, `sub_teacher_id`, `sub_subject_id`, `sub_teacher_name`, `sub_subject_name`, `sub_status`, `sub_tid`, `sub_addby`, `sub_date`, `created_at`, `updated_at`) VALUES
(14, 5, 6, 'Bello 2 Young 2', 'Socialogy', 'Active', 'LQwOs91AzuUon6Dm', 'Ken220', '27/08/2022 12:33:41', '2022-08-27 11:33:41', '2022-08-27 16:23:16'),
(15, 1, 3, 'Bello 2 Young 2', 'English Language', 'Active', 'LQwOs91AzuUon6Dm', 'Ken220', '27/08/2022 12:33:41', '2022-08-27 11:33:41', '2022-08-27 16:25:48'),
(16, 1, 8, 'Bello 2 Young 2', 'Economics', 'Active', 'LQwOs91AzuUon6Dm', 'Ken220', '27/08/2022 12:33:41', '2022-08-27 11:33:41', '2022-08-27 16:22:49'),
(17, 5, 6, 'Ken Young', 'Socialogy', 'Active', 'EwjloD3pUiWgI2r4', 'Ken220', '27/08/2022 12:34:43', '2022-08-27 11:34:43', '2022-08-27 12:14:23'),
(18, 5, 4, 'Ken Young', 'Physic Updated', 'Active', 'EwjloD3pUiWgI2r4', 'Ken220', '27/08/2022 12:34:43', '2022-08-27 11:34:43', '2022-08-27 12:14:23'),
(19, 5, 8, 'Ken Young', 'Economics', 'Active', 'EwjloD3pUiWgI2r4', 'Ken220', '27/08/2022 12:34:43', '2022-08-27 11:34:43', '2022-08-27 12:14:23'),
(20, 2, 7, 'Ken Young', 'Biology Science', 'Deleted', 'EwjloD3pUiWgI2r4', 'Ken220', '27/08/2022 12:34:43', '2022-08-27 11:34:43', '2022-08-27 19:46:00'),
(21, 5, 4, 'Ken Young', 'Physic Updated', 'Active', 'EwjloD3pUiWgI2r4', 'Ken220', '27/08/2022 20:45:47', '2022-08-27 19:45:47', '2022-08-27 19:45:47'),
(22, 5, 3, 'Ken Young', 'English Language', 'Active', 'EwjloD3pUiWgI2r4', 'Ken220', '27/08/2022 20:45:47', '2022-08-27 19:45:47', '2022-08-27 19:45:47'),
(23, 2, 5, 'Ken Young', 'Chemistry Updated', 'Active', 'EwjloD3pUiWgI2r4', 'Ken220', '27/08/2022 20:45:47', '2022-08-27 19:45:47', '2022-08-27 19:45:47');

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `assign_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_sub_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_body` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_subject` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addby_user_id` int(20) DEFAULT NULL,
  `assign_class_id` bigint(20) DEFAULT NULL,
  `assign_submission_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_tid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`id`, `assign_title`, `assign_sub_title`, `assign_body`, `assign_class`, `add_subject`, `assign_file`, `assign_type`, `assign_status`, `addby`, `addby_user_id`, `assign_class_id`, `assign_submission_date`, `assign_date`, `assign_tid`, `created_at`, `updated_at`) VALUES
(1, 'Test Assignment', NULL, 'This is the body of the assignment', '6', '4', '', 'Home Work', 'Active', 'vivian', NULL, 5, '2022-09-26', '09/09/2022 14:27:43', '71P90YmUwcgNZjhG', '2022-09-09 13:27:43', '2022-09-09 13:27:43'),
(2, 'eqeeq', NULL, 'egwrgwgweewf', 'Pre-Nursery', '8', '', 'Class Work', 'Deleted', 'vivian', 5, 9, '2022-09-11', '09/09/2022 14:33:11', 'vEW4u502BF8gIxeR', '2022-09-09 13:33:11', '2022-09-09 15:09:13'),
(3, 'Programing Skill', NULL, 'wrvwSVWs', 'JSS 3A', 'Physic Updated', 'uploads/assignment_folder/1662747917.pdf', 'Home Work', 'Active', 'vivian', 5, 6, '2022-09-12', '09/09/2022 14:55:38', 'm8UV62peQyKjoIZg', '2022-09-09 13:55:38', '2022-09-09 17:25:17'),
(4, 'hrht', NULL, 'eesesger', 'Pre-Nursery', 'Socialogy', '', 'Class Work', 'Deleted', 'vivian', 5, 9, '2022-09-13', '09/09/2022 15:03:07', 'jnsYewuWXMADZLBO', '2022-09-09 14:03:07', '2022-09-09 15:09:03'),
(5, 'ueher good', NULL, 'body text eeeew thank you', 'JSS 3A', 'Economics', 'uploads/assignment_folder/1662747753.docx', 'Home Work', 'Active', 'vivian', 5, 6, '2022-09-25', '09/09/2022 15:17:16', 'jxlBmw3YXP1sZbWJ', '2022-09-09 14:17:16', '2022-09-09 17:22:33'),
(6, 'testing', NULL, 'Thank you student', 'JSS 3A', 'English Language', 'http://localhost:8000/uploads/assignment_folder/1663151085.jpg', 'Class Work', 'Active', 'vivian', 5, 6, '2022-09-22', '14/09/2022 10:24:45', 'LVwOCmJqi0dGMN9j', '2022-09-14 09:24:45', '2022-09-14 09:24:45');

-- --------------------------------------------------------

--
-- Table structure for table `assign_classes`
--

CREATE TABLE `assign_classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cls_teacher_id` bigint(20) DEFAULT NULL,
  `cls__class_id` bigint(20) DEFAULT NULL,
  `cls__teacher_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cls__class_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cls__status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cls__tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cls__addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cls__date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assign_classes`
--

INSERT INTO `assign_classes` (`id`, `cls_teacher_id`, `cls__class_id`, `cls__teacher_name`, `cls__class_name`, `cls__status`, `cls__tid`, `cls__addby`, `cls__date`, `created_at`, `updated_at`) VALUES
(1, 2, 6, 'Ken Young', 'JSS 3A', 'Deleted', 'dwShZ4MTsm3K0oyt', 'Ken220', '27/08/2022 19:07:38', '2022-08-27 18:07:38', '2022-08-27 19:17:39'),
(2, 2, 9, 'Ken Young', 'Pre-Nursery', 'Deleted', 'dwShZ4MTsm3K0oyt', 'Ken220', '27/08/2022 19:07:38', '2022-08-27 18:07:38', '2022-08-27 19:17:55'),
(3, 2, 7, 'Ken Young', 'SS 1A', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '27/08/2022 19:07:38', '2022-08-27 18:07:38', '2022-08-27 18:54:04'),
(4, 1, 5, 'Bello 2 Young 2', 'JSS 2A Updated', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '27/08/2022 19:54:38', '2022-08-27 18:54:38', '2022-08-27 18:54:38'),
(5, 1, 7, 'Bello 2 Young 2', 'SS 1A', 'Deleted', 'HzqCGjXtoi9Pwyp0', 'Ken220', '27/08/2022 19:54:38', '2022-08-27 18:54:38', '2022-08-31 13:41:55'),
(6, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '27/08/2022 19:54:38', '2022-08-27 18:54:38', '2022-08-27 18:54:38'),
(7, 1, 6, 'Bello 2 Young 2', 'JSS 3A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '27/08/2022 19:54:38', '2022-08-27 18:54:38', '2022-08-27 18:54:38'),
(11, 1, 6, 'Bello 2 Young 2', 'JSS 3A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '27/08/2022 20:10:26', '2022-08-27 19:10:26', '2022-08-27 19:10:26'),
(12, 1, 7, 'Bello 2 Young 2', 'SS 1A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '27/08/2022 20:10:26', '2022-08-27 19:10:26', '2022-08-27 19:10:26'),
(13, 1, 5, 'Bello 2 Young 2', 'JSS 2A Updated', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '27/08/2022 20:10:26', '2022-08-27 19:10:26', '2022-08-27 19:10:26'),
(14, 2, 8, 'Ken Young', 'SS 2B', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '27/08/2022 20:15:21', '2022-08-27 19:15:21', '2022-08-27 19:15:21'),
(15, 5, 6, 'Ken Young', 'JSS 3A', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '27/08/2022 20:15:21', '2022-08-27 19:15:21', '2022-08-27 19:15:21'),
(16, 2, 9, 'Ken Young', 'Pre-Nursery', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '27/08/2022 20:15:21', '2022-08-27 19:15:21', '2022-08-27 19:15:21'),
(17, 2, 5, 'Ken Young', 'JSS 2A Updated', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '27/08/2022 20:15:21', '2022-08-27 19:15:21', '2022-08-27 19:15:21'),
(18, 2, 9, 'Ken Young', 'Pre-Nursery', 'Deleted', 'dwShZ4MTsm3K0oyt', 'Ken220', '27/08/2022 20:17:09', '2022-08-27 19:17:09', '2022-08-27 19:17:50'),
(19, 2, 6, 'Ken Young', 'JSS 3A', 'Deleted', 'dwShZ4MTsm3K0oyt', 'Ken220', '27/08/2022 20:17:09', '2022-08-27 19:17:09', '2022-08-27 19:17:33'),
(20, 2, 5, 'Ken Young', 'JSS 2A Updated', 'Deleted', 'dwShZ4MTsm3K0oyt', 'Ken220', '27/08/2022 20:17:09', '2022-08-27 19:17:09', '2022-08-27 19:17:29'),
(21, 2, 7, 'Ken Young', 'SS 1A', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 16:36:56', '2022-08-29 15:36:56', '2022-08-29 15:36:56'),
(22, 2, 9, 'Ken Young', 'Pre-Nursery', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 16:36:56', '2022-08-29 15:36:56', '2022-08-29 15:36:56'),
(23, 5, 5, 'Ken Young', 'JSS 2A Updated', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 16:36:56', '2022-08-29 15:36:56', '2022-08-29 15:36:56'),
(24, 2, 9, 'Ken Young', 'Pre-Nursery', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 17:17:50', '2022-08-29 16:17:50', '2022-08-29 16:17:50'),
(25, 2, 9, 'Ken Young', 'Pre-Nursery', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 17:18:13', '2022-08-29 16:18:13', '2022-08-29 16:18:13'),
(26, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:18:33', '2022-08-29 16:18:33', '2022-08-29 16:18:33'),
(27, 1, 6, 'Bello 2 Young 2', 'JSS 3A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:27:58', '2022-08-29 16:27:58', '2022-08-29 16:27:58'),
(28, 5, 9, 'Ken Young', 'Pre-Nursery', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 17:28:08', '2022-08-29 16:28:08', '2022-08-29 16:28:08'),
(29, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:28:19', '2022-08-29 16:28:19', '2022-08-29 16:28:19'),
(30, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:29:08', '2022-08-29 16:29:08', '2022-08-29 16:29:08'),
(31, 2, 5, 'Ken Young', 'JSS 2A Updated', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 17:29:17', '2022-08-29 16:29:17', '2022-08-29 16:29:17'),
(32, 1, 6, 'Bello 2 Young 2', 'JSS 3A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:29:41', '2022-08-29 16:29:41', '2022-08-29 16:29:41'),
(33, 1, 6, 'Bello 2 Young 2', 'JSS 3A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:30:05', '2022-08-29 16:30:05', '2022-08-29 16:30:05'),
(34, 1, 5, 'Bello 2 Young 2', 'JSS 2A Updated', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:30:32', '2022-08-29 16:30:32', '2022-08-29 16:30:32'),
(35, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:30:59', '2022-08-29 16:30:59', '2022-08-29 16:30:59'),
(36, 2, 9, 'Ken Young', 'Pre-Nursery', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 17:31:08', '2022-08-29 16:31:08', '2022-08-29 16:31:08'),
(37, 2, 9, 'Ken Young', 'Pre-Nursery', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 17:31:36', '2022-08-29 16:31:36', '2022-08-29 16:31:36'),
(38, 2, 9, 'Ken Young', 'Pre-Nursery', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 17:52:04', '2022-08-29 16:52:04', '2022-08-29 16:52:04'),
(39, 1, 7, 'Bello 2 Young 2', 'SS 1A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:52:18', '2022-08-29 16:52:18', '2022-08-29 16:52:18'),
(40, 1, 7, 'Bello 2 Young 2', 'SS 1A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:53:45', '2022-08-29 16:53:45', '2022-08-29 16:53:45'),
(41, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:53:57', '2022-08-29 16:53:57', '2022-08-29 16:53:57'),
(42, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:56:10', '2022-08-29 16:56:10', '2022-08-29 16:56:10'),
(43, 1, 6, 'Bello 2 Young 2', 'JSS 3A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 17:56:20', '2022-08-29 16:56:20', '2022-08-29 16:56:20'),
(44, 1, 7, 'Bello 2 Young 2', 'SS 1A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 18:01:53', '2022-08-29 17:01:53', '2022-08-29 17:01:53'),
(45, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 18:02:03', '2022-08-29 17:02:03', '2022-08-29 17:02:03'),
(46, 2, 9, 'Ken Young', 'Pre-Nursery', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 18:03:02', '2022-08-29 17:03:02', '2022-08-29 17:03:02'),
(47, 2, 9, 'Ken Young', 'Pre-Nursery', 'Active', 'dwShZ4MTsm3K0oyt', 'Ken220', '29/08/2022 18:03:11', '2022-08-29 17:03:11', '2022-08-29 17:03:11'),
(48, 1, 6, 'Bello 2 Young 2', 'JSS 3A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 18:03:48', '2022-08-29 17:03:48', '2022-08-29 17:03:48'),
(49, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 18:07:51', '2022-08-29 17:07:51', '2022-08-29 17:07:51'),
(50, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 18:09:39', '2022-08-29 17:09:39', '2022-08-29 17:09:39'),
(51, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 18:15:06', '2022-08-29 17:15:06', '2022-08-29 17:15:06'),
(52, 1, 7, 'Bello 2 Young 2', 'SS 1A', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 18:33:03', '2022-08-29 17:33:03', '2022-08-29 17:33:03'),
(53, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 18:33:15', '2022-08-29 17:33:15', '2022-08-29 17:33:15'),
(54, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 18:33:59', '2022-08-29 17:33:59', '2022-08-29 17:33:59'),
(55, 1, 9, 'Bello 2 Young 2', 'Pre-Nursery', 'Active', 'HzqCGjXtoi9Pwyp0', 'Ken220', '29/08/2022 18:38:18', '2022-08-29 17:38:18', '2022-08-29 17:38:18');

-- --------------------------------------------------------

--
-- Table structure for table `attendances`
--

CREATE TABLE `attendances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `atten_admin_no` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_stu_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_mark_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_submit_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_addeby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_class_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_year_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_term_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_tid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atten_date` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendances`
--

INSERT INTO `attendances` (`id`, `atten_admin_no`, `atten_stu_name`, `atten_class`, `atten_year`, `atten_term`, `atten_mark_date`, `atten_submit_date`, `atten_status`, `atten_addeby`, `atten_class_name`, `atten_year_name`, `atten_term_name`, `atten_tid`, `atten_date`, `created_at`, `updated_at`) VALUES
(3, 'wewewe333', 'regerg', '6', '6', '7', '2022-08-22', '25/08/2022 15:07:01', 'Active', 'Ken220', 'JSS 3A', '2013/2014', 'First Term', 'uif5hLE3JPH9d0Ur', NULL, NULL, NULL),
(4, 'ICC/90998/09', 'Ken Developer', '6', '6', '7', '2022-08-22', '25/08/2022 15:07:01', 'Active', 'Ken220', 'JSS 3A', '2013/2014', 'First Term', 'uif5hLE3JPH9d0Ur', NULL, NULL, NULL),
(5, 'CS/30303', 'fdfvsvs', '6', '6', '7', '2022-08-22', '25/08/2022 15:07:01', 'Active', 'Ken220', 'JSS 3A', '2013/2014', 'First Term', 'uif5hLE3JPH9d0Ur', NULL, NULL, NULL),
(6, 'wewewe333', 'regerg', '6', '6', '8', '2022-08-15', '25/08/2022 15:10:45', 'Deleted', 'Ken220', 'JSS 3A', '2013/2014', 'Third Term', '2RF13MYSJH4j8Pdx', NULL, NULL, '2022-09-10 09:21:36'),
(7, 'ICC/90998/09', 'Ken Developer', '6', '6', '8', '2022-08-15', '25/08/2022 15:10:45', 'Deleted', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', '2RF13MYSJH4j8Pdx', NULL, NULL, '2022-09-10 09:21:36'),
(8, 'CS/30303', 'fdfvsvs', '6', '6', '8', '2022-08-15', '25/08/2022 15:10:45', 'Deleted', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', '2RF13MYSJH4j8Pdx', NULL, NULL, '2022-09-10 09:21:36'),
(9, 'wewewe333', 'regerg', '6', '6', '8', '2022-07-04', '25/08/2022 15:21:09', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'vNHw3m8zyOV6jdqX', NULL, NULL, '2022-08-25 15:33:17'),
(10, 'wewewe333', 'regerg', '6', '6', '8', '2022-07-04', '25/08/2022 15:21:14', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'vNHw3m8zyOV6jdqX', NULL, NULL, '2022-08-25 15:45:06'),
(11, 'ICC/90998/09', 'Ken Developer', '6', '6', '8', '2022-07-04', '25/08/2022 15:21:14', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'vNHw3m8zyOV6jdqX', NULL, NULL, '2022-08-25 15:45:06'),
(12, 'CS/30303', 'fdfvsvs', '6', '6', '8', '2022-07-04', '25/08/2022 15:21:14', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'vNHw3m8zyOV6jdqX', NULL, NULL, '2022-08-25 15:45:06'),
(13, 'CS/30303', 'fdfvsvs', '6', '6', '8', '2022-08-29', '25/08/2022 17:03:39', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'OFD970mEIMwCpSir', NULL, NULL, NULL),
(14, 'wewewe333', 'regerg', '6', '7', '7', '2022-08-31', '25/08/2022 17:06:23', 'Deleted', 'vivian', 'JSS 3A', '2015/2016', 'First Term', 'jAb9VLXogsWeSQzc', NULL, NULL, '2022-09-10 09:21:51'),
(15, 'wewewe333', 'regerg', '6', '6', '7', '2022-08-01', '25/08/2022 17:13:01', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'First Term', 'luTYbje1PpHrCw7R', NULL, NULL, '2022-08-26 16:54:27'),
(16, 'ICC/90998/09', 'Ken Developer', '6', '6', '7', '2022-08-01', '25/08/2022 17:13:01', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'First Term', 'luTYbje1PpHrCw7R', NULL, NULL, '2022-08-26 16:54:32'),
(17, 'CS/30303', 'fdfvsvs', '6', '6', '7', '2022-08-01', '25/08/2022 17:13:01', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'First Term', 'luTYbje1PpHrCw7R', NULL, NULL, '2022-08-26 16:54:34'),
(18, 'ICC/90998/09', 'Ken Developer', '6', '6', '8', '2022-08-27', '25/08/2022 17:13:28', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'n4Gd2At5f39Hw6kz', NULL, NULL, '2022-08-27 16:27:34'),
(19, 'wewewe333', 'regerg', '6', '6', '8', '2022-08-27', '25/08/2022 17:13:40', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'n4Gd2At5f39Hw6kz', NULL, NULL, '2022-09-09 17:43:20'),
(20, 'CS/30303', 'fdfvsvs', '6', '6', '8', '2022-08-27', '25/08/2022 17:13:40', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'n4Gd2At5f39Hw6kz', NULL, NULL, NULL),
(48, 'ICC/90998/09', 'Ken Developer', '6', '7', '8', '2022-08-27', '26/08/2022 17:51:08', 'Active', 'Ken220', 'JSS 3A', '2015/2016', 'Third Term', '71kHVrKY4Q89XSvz', NULL, NULL, '2022-08-26 17:15:01'),
(49, 'CS/30303', 'fdfvsvs', '6', '7', '8', '2022-08-27', '26/08/2022 17:51:08', 'Deleted', 'Ken220', 'JSS 3A', '2015/2016', 'Third Term', '71kHVrKY4Q89XSvz', NULL, NULL, '2022-08-26 17:15:01'),
(61, 'CS/30303', 'fdfvsvs', '6', '6', '8', '2022-09-27', '10/09/2022 09:54:11', 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'ucRDF1VYU94Xg5ZB', NULL, NULL, NULL),
(62, 'SS/P/2022', 'regerg', '6', '5', '7', '2022-09-29', '10/09/2022 10:09:11', 'Active', 'vivian', 'JSS 3A', '2011/2012', 'Third Term', 'o1uxNXaqWcrgvbsI', NULL, NULL, NULL),
(63, 'SS/P/2022', 'Ken Developer', '6', '5', '7', '2022-09-29', '10/09/2022 10:09:11', 'Active', 'vivian', 'JSS 3A', '2011/2012', 'Third Term', 'o1uxNXaqWcrgvbsI', NULL, NULL, NULL),
(64, 'SS/P/2022', 'fdfvsvs', '6', '5', '7', '2022-09-29', '10/09/2022 10:09:11', 'Active', 'vivian', 'JSS 3A', '2011/2012', 'Third Term', 'o1uxNXaqWcrgvbsI', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `class_models`
--

CREATE TABLE `class_models` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `class_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `record_date` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `class_models`
--

INSERT INTO `class_models` (`id`, `class_name`, `added_by`, `status`, `action`, `record_date`, `created_at`, `updated_at`) VALUES
(1, 'Blue House', 'Ken Young', 'Deleted', NULL, '29/07/2022 12:34:03', '2022-07-29 11:34:03', '2022-07-29 14:51:12'),
(2, 'svswwe', 'Ken Young', 'Deleted', NULL, '29/07/2022 14:18:59', '2022-07-29 13:18:59', '2022-07-29 14:48:40'),
(3, 'ddffd', 'Ken Young', 'Deleted', NULL, '29/07/2022 14:23:20', '2022-07-29 13:23:20', '2022-07-29 14:45:43'),
(4, 'ffffgg', 'Ken Young', 'Deleted', NULL, '29/07/2022 14:30:43', '2022-07-29 13:30:43', '2022-07-29 14:45:36'),
(5, 'JSS 2A Updated', 'Ken Young', 'Deleted', NULL, '29/07/2022 15:48:24', '2022-07-29 14:48:24', '2022-09-09 17:57:32'),
(6, 'JSS 3A', 'Ken Young', 'Active', NULL, '29/07/2022 15:48:32', '2022-07-29 14:48:32', '2022-07-29 14:48:32'),
(7, 'SS 1A', 'Ken Young', 'Active', NULL, '29/07/2022 15:52:25', '2022-07-29 14:52:25', '2022-07-29 14:52:25'),
(8, 'SS 2B', 'Ken Young', 'Active', NULL, '29/07/2022 15:53:38', '2022-07-29 14:53:38', '2022-07-31 19:14:30'),
(9, 'Pre-Nursery', 'Ken Young', 'Deleted', NULL, '06/08/2022 13:47:05', '2022-08-06 12:47:05', '2022-09-09 17:56:24'),
(10, 'dfgdthhyyy', 'Ken Young', 'Deleted', NULL, '07/08/2022 12:39:33', '2022-08-07 11:39:33', '2022-08-07 11:39:43'),
(11, 'JSS 2B', 'Ken Young', 'Active', NULL, '31/08/2022 14:41:07', '2022-08-31 13:41:07', '2022-08-31 13:41:07');

-- --------------------------------------------------------

--
-- Table structure for table `current_sessions`
--

CREATE TABLE `current_sessions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `running_session` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_addedby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `current_sessions`
--

INSERT INTO `current_sessions` (`id`, `running_session`, `session_status`, `session_addedby`, `session_date`, `created_at`, `updated_at`) VALUES
(1, '7', 'Deleted', 'Ken220', '31/07/2022 18:25:08', '2022-07-31 17:25:08', '2022-07-31 18:12:36'),
(2, '5', 'Active', 'Ken220', '31/07/2022 19:12:19', '2022-07-31 18:12:19', '2022-07-31 18:12:19'),
(3, '6', 'Deleted', 'Ken220', '31/07/2022 19:12:26', '2022-07-31 18:12:26', '2022-09-09 17:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `c_a_result_process_starts`
--

CREATE TABLE `c_a_result_process_starts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tid_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addby_user_id` int(10) DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `record_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `c_a_result_process_starts`
--

INSERT INTO `c_a_result_process_starts` (`id`, `year`, `term`, `class`, `subject`, `sch_category`, `tid_code`, `add_by`, `addby_user_id`, `status`, `record_date`, `created_at`, `updated_at`) VALUES
(4, '5', '8', '6', '8', '1', 'Ii8mRXuBLz7ypAWP', 'Ken220', NULL, 'Deleted', '11/08/2022 13:50:52', '2022-08-11 12:50:52', '2022-08-11 14:29:05'),
(5, '6', '8', '6', '8', '1', 'SBcAMWUsFibmfyr3', 'Ken220', NULL, 'Deleted', '11/08/2022 13:52:14', '2022-08-11 12:52:14', '2022-08-11 14:29:53'),
(6, '6', '7', '6', '7', '1', 't9N3spKJHyqPmvh6', 'Ken220', NULL, 'Deleted', '11/08/2022 14:06:03', '2022-08-11 13:06:03', '2022-08-11 14:30:19'),
(8, '2013/2014', 'Third Term', 'JSS 3A', 'Math', 'Primary School', 'yebr98LK0jFDCqaY', 'Ken220', NULL, 'Deleted', '11/08/2022 15:06:05', '2022-08-11 14:06:05', '2022-08-11 14:30:23'),
(9, '5', '7', '5', '1', '1', 'o7gR6iakyuJ9qGCO', 'Ken220', NULL, 'Deleted', '11/08/2022 15:32:12', '2022-08-11 14:32:12', '2022-08-11 14:32:57'),
(11, '2011/2012', 'First Term', 'JSS 3A', 'Math', 'Primary School', 'M2EN50ik93mgK7XO', 'Ken220', NULL, 'Deleted', '11/08/2022 15:33:33', '2022-08-11 14:33:33', '2022-09-03 09:53:15'),
(14, '2015/2016', 'First Term', 'JSS 3A', 'English Language', 'Pre-Nursery', 'LOdCZliBwIMspFWU', 'Ken220', NULL, 'Saved, Successfully', '11/08/2022 15:50:36', '2022-08-11 14:50:36', '2022-08-11 14:50:36'),
(16, '2013/2014', 'Third Term', 'JSS 3A', 'Biology Science', 'Primary School', '19StFUOw8Gz4ndjJ', 'Ken220', NULL, 'Saved, Successfully', '11/08/2022 15:55:25', '2022-08-11 14:55:25', '2022-08-11 14:55:25'),
(18, '2015/2016', 'First Term', 'JSS 3A', 'Math', 'Primary School', 'kl48LrCDTxHuGfF2', 'Ken220', NULL, 'Saved, Successfully', '12/08/2022 08:57:56', '2022-08-12 07:57:56', '2022-08-12 07:57:56'),
(20, '2015/2016', 'First Term', 'JSS 3A', 'Math', 'Primary School', 'ERmTCtGnNzHrUkgu', 'Ken220', NULL, 'Saved, Successfully', '12/08/2022 09:01:11', '2022-08-12 08:01:11', '2022-08-12 08:01:11'),
(21, '2013/2014', 'First Term', 'JSS 3A', 'English Language', 'Primary School', '6bFz42jwEhCGkp5B', 'Ken220', NULL, 'Deleted', '13/08/2022 17:36:28', '2022-08-13 16:36:28', '2022-08-13 16:37:32'),
(22, '2015/2016', 'First Term', 'JSS 3A', 'Chemistry Updated', 'Pre-Nursery', 'VkIZGYQCUzo8nLR2', 'Ken220', NULL, 'Saved, Successfully', '13/08/2022 17:38:15', '2022-08-13 16:38:15', '2022-08-13 16:38:15'),
(23, '2013/2014', 'Third Term', 'JSS 3A', 'Socialogy', 'Primary School', 'yNI6tBidA1H7sJEW', 'Ken220', 5, 'Saved, Successfully', '13/08/2022 17:40:05', '2022-08-13 16:40:05', '2022-08-13 16:40:05'),
(24, '2013/2014', 'Third Term', 'JSS 3A', 'Economics', 'Primary School', 'CTfHiS5bwlr9gaWm', 'Ken220', 5, 'Saved, Successfully', '13/08/2022 17:42:41', '2022-08-13 16:42:41', '2022-08-13 16:42:41'),
(25, '2013/2014', 'Third Term', 'JSS 3A', 'English Language', 'Pre-Nursery', 'pabwmOoiJRCzfqMu', 'Ken220', 5, 'Saved, Successfully', '13/08/2022 17:44:00', '2022-08-13 16:44:00', '2022-08-13 16:44:00'),
(26, '2013/2014', 'Third Term', 'SS 2B', 'Biology Science', 'Primary School', 'UAO5nVevJpSWuyKL', 'Ken220', 5, 'Saved, Successfully', '13/08/2022 17:46:18', '2022-08-13 16:46:18', '2022-08-13 16:46:18'),
(27, '2013/2014', 'First Term', 'JSS 3A', 'Socialogy', 'Primary School', '2ElKCtSM6eR7G5o8', 'Ken220', 5, 'Saved, Successfully', '13/08/2022 17:51:50', '2022-08-13 16:51:50', '2022-08-13 16:51:50'),
(28, '2013/2014', 'First Term', 'SS 1A', 'Socialogy', 'Primary School', 'mAkrGzhgWQ3yuX4U', 'Ken220', 5, 'Saved, Successfully', '13/08/2022 17:52:26', '2022-08-13 16:52:26', '2022-08-13 16:52:26'),
(31, '2015/2016', 'Third Term', 'JSS 3A', 'Math', 'Primary School', 'LwYnTb7tmWy0dBZV', 'Ken220', 5, 'Saved, Successfully', '19/08/2022 11:42:14', '2022-08-19 10:42:14', '2022-08-19 10:42:14'),
(33, '2015/2016', 'First Term', 'JSS 3A', 'Socialogy', 'Primary School', 'UMsxJe8A3cZOEauH', 'Ken220', 5, 'Deleted', '19/08/2022 11:43:29', '2022-08-19 10:43:29', '2022-09-22 19:04:58'),
(35, '2015/2016', 'First Term', 'JSS 3A', 'English Language', 'Primary School', 'ltMRSAyzGsCQfTei', 'Ken220', 5, 'Saved, Successfully', '19/08/2022 13:43:30', '2022-08-19 12:43:30', '2022-08-19 12:43:30'),
(36, '2015/2016', 'Third Term', 'JSS 3A', 'Biology Science', 'Primary School', 'SUgQdnHkJpEehPMC', 'Ken220', 5, 'Saved, Successfully', '19/08/2022 14:08:26', '2022-08-19 13:08:26', '2022-08-19 13:08:26'),
(38, '2013/2014', 'First Term', 'JSS 3A', 'Physic', 'Primary School', '2AJSjxoaeRQknX34', 'Ken220', 5, 'Saved, Successfully', '01/09/2022 16:25:46', '2022-09-01 15:25:46', '2022-09-01 15:25:46'),
(42, '2015/2016', 'First Term', 'JSS 3A', 'Economics', NULL, 'NeBF9WLZKESDbJYj', 'vivian', 5, 'Saved, Successfully', '09/09/2022 12:25:28', '2022-09-09 11:25:28', '2022-09-09 11:25:28'),
(43, '2013/2014', 'First Term', 'JSS 3A', 'Socialogy', NULL, 'ORCprFVTabzdj6Jw', 'vivian', 5, 'Saved, Successfully', '09/09/2022 12:45:05', '2022-09-09 11:45:05', '2022-09-09 11:45:05'),
(44, '2013/2014', 'Third Term', 'JSS 3A', 'Music', 'Pre-Nursery', '7ZmhL46aMlJXHqsz', 'Ken220', 1, 'Saved, Successfully', '24/09/2022 09:21:34', '2022-09-24 08:21:34', '2022-09-24 08:21:34'),
(45, '2013/2014', 'Third Term', 'JSS 3A', 'English Language', NULL, 'TfjznEWMrN5LdtG8', 'vivian', 5, 'Deleted', '24/09/2022 09:39:28', '2022-09-24 08:39:28', '2022-09-24 08:39:43');

-- --------------------------------------------------------

--
-- Table structure for table `days_school_opens`
--

CREATE TABLE `days_school_opens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `days_open` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `open_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `open_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `open_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `open_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `open_addedby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `days_school_opens`
--

INSERT INTO `days_school_opens` (`id`, `days_open`, `open_term`, `open_year`, `open_status`, `open_date`, `open_addedby`, `created_at`, `updated_at`) VALUES
(1, '107', '8', '6', 'Active', '31/07/2022 17:04:48', 'Ken220', '2022-07-31 16:04:48', '2022-07-31 16:42:51'),
(2, '70', '7', '5', 'Active', '31/07/2022 17:37:16', 'Ken220', '2022-07-31 16:37:16', '2022-07-31 16:48:38'),
(3, '10', '8', '5', 'Active', '31/07/2022 17:47:05', 'Ken220', '2022-07-31 16:47:05', '2022-07-31 16:47:05'),
(4, '5', '8', '7', 'Active', '31/07/2022 17:47:53', 'Ken220', '2022-07-31 16:47:53', '2022-07-31 16:47:53');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `finance_reports`
--

CREATE TABLE `finance_reports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `amt` double(8,2) DEFAULT 0.00,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qty` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nature` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expense` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addedby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fin_tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approve_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `close_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `finance_reports`
--

INSERT INTO `finance_reports` (`id`, `amt`, `type`, `qty`, `nature`, `disc`, `expense`, `addedby`, `status`, `fin_tid`, `add_date`, `approve_date`, `close_date`, `created_at`, `updated_at`) VALUES
(1, 200.00, 'sale', '2', 'new', 'sales of materials', NULL, 'Ken220', 'Pending', 'zZ7uw4Uqk1jPQr2e', '01/09/2022 12:08:57', NULL, NULL, '2022-09-01 11:08:57', '2022-09-01 11:08:57'),
(2, 1000.00, 'purchase', '3', 'Payment', 'Payment for New Items', NULL, 'Ken220', 'Pending', 'zZ7uw4Uqk1jPQr2e', '01/09/2022 12:08:57', NULL, NULL, '2022-09-01 11:08:57', '2022-09-01 11:08:57'),
(3, 2500.00, 'Repair', '1', 'Expense', 'Repaire of Generator', NULL, 'Ken220', 'Pending', 'zZ7uw4Uqk1jPQr2e', '01/09/2022 12:08:57', NULL, NULL, '2022-09-01 11:08:57', '2022-09-01 11:08:57'),
(4, 50000.00, 'Salar', '2', 'Expense', 'Payment for staff salar', NULL, 'Ken220', 'Pending', 'zZ7uw4Uqk1jPQr2e', '01/09/2022 12:08:57', NULL, NULL, '2022-09-01 11:08:57', '2022-09-01 11:08:57'),
(5, 200.00, 'sale', '2', 'new', 'sales of materials', NULL, 'Ken220', 'Pending', 'Ym21rKVlnwc4GHkT', '01/09/2022 12:10:28', NULL, NULL, '2022-09-01 11:10:28', '2022-09-01 11:10:28'),
(6, 1000.00, 'purchase', '3', 'Payment', 'Payment for New Items', NULL, 'Ken220', 'Pending', 'Ym21rKVlnwc4GHkT', '01/09/2022 12:10:28', NULL, NULL, '2022-09-01 11:10:28', '2022-09-01 11:10:28'),
(7, 2500.00, 'Repair', '1', 'Expense', 'Repaire of Generator', NULL, 'Ken220', 'Pending', 'Ym21rKVlnwc4GHkT', '01/09/2022 12:10:28', NULL, NULL, '2022-09-01 11:10:28', '2022-09-01 11:10:28'),
(8, 50000.00, 'Salar', '2', 'Expense', 'Payment for staff salar', NULL, 'Ken220', 'Pending', 'Ym21rKVlnwc4GHkT', '01/09/2022 12:10:28', NULL, NULL, '2022-09-01 11:10:28', '2022-09-01 11:10:28'),
(9, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-01 11:39:13', '2022-09-01 11:39:13'),
(10, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-01 11:39:13', '2022-09-01 11:39:13'),
(11, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-01 11:39:13', '2022-09-01 11:39:13'),
(12, 0.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-09-01 11:39:13', '2022-09-01 11:39:13'),
(13, 200.00, 'sale', '2', 'new', 'sales of materials', NULL, 'Ken220', 'Pending', 'grxYMW70VQSD4vOJ', '01/09/2022 12:48:05', NULL, NULL, '2022-09-01 11:48:05', '2022-09-01 11:48:05'),
(14, 1000.00, 'purchase', '3', 'Payment', 'Payment for New Items', NULL, 'Ken220', 'Pending', 'grxYMW70VQSD4vOJ', '01/09/2022 12:48:05', NULL, NULL, '2022-09-01 11:48:05', '2022-09-01 11:48:05'),
(15, 2500.00, 'Repair', '1', 'Expense', 'Repaire of Generator', NULL, 'Ken220', 'Pending', 'grxYMW70VQSD4vOJ', '01/09/2022 12:48:05', NULL, NULL, '2022-09-01 11:48:05', '2022-09-01 11:48:05'),
(16, 50000.00, 'Salar', '2', 'Expense', 'Payment for staff salar', NULL, 'Ken220', 'Pending', 'grxYMW70VQSD4vOJ', '01/09/2022 12:48:05', NULL, NULL, '2022-09-01 11:48:05', '2022-09-01 11:48:05');

-- --------------------------------------------------------

--
-- Table structure for table `generate_pins`
--

CREATE TABLE `generate_pins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `card_pin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_serial` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_usage_count` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_usage_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_use_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_use_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_addedby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_tid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `generate_pins`
--

INSERT INTO `generate_pins` (`id`, `card_pin`, `card_serial`, `card_status`, `card_usage_count`, `card_usage_status`, `card_date`, `card_use_date`, `card_use_username`, `card_addedby`, `card_tid`, `created_at`, `updated_at`) VALUES
(1, 'AE071529BC', NULL, 'Active', NULL, NULL, '26/08/2022 12:04:30', NULL, NULL, 'Ken220', 'VGRhMOYHEIkswr7C', '2022-08-26 11:04:30', '2022-08-26 15:08:54'),
(2, 'A7B48361E0', NULL, 'Deleted', NULL, NULL, '26/08/2022 12:04:30', NULL, NULL, 'Ken220', 'VGRhMOYHEIkswr7C', '2022-08-26 11:04:30', '2022-08-26 15:01:41'),
(3, '1EDC93A85B', NULL, 'Active', NULL, NULL, '26/08/2022 12:04:30', NULL, NULL, 'Ken220', 'VGRhMOYHEIkswr7C', '2022-08-26 11:04:30', '2022-08-26 15:08:54'),
(4, '2DE794538A', NULL, 'Active', NULL, NULL, '26/08/2022 12:04:30', NULL, NULL, 'Ken220', 'VGRhMOYHEIkswr7C', '2022-08-26 11:04:30', '2022-08-26 15:08:54'),
(5, 'B381C76D05', NULL, 'Deleted', NULL, 'Used', '26/08/2022 12:04:30', NULL, NULL, 'Ken220', 'VGRhMOYHEIkswr7C', '2022-08-26 11:04:30', '2022-08-26 15:01:45'),
(6, '7249ECD5A1', NULL, 'Active', '67', 'Used', '26/08/2022 12:24:56', '17/09/2022 21:14:17', 'SS/P/2022', 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-09-17 20:14:17'),
(7, 'A6240815F3', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(8, '850C76B14D', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(9, '8D5B47EF23', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(10, '4F0DAEBC12', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(11, '63C89D4FAE', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(12, '7A6849E035', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(13, '26EA743B8F', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(14, '05F76CB3D1', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(15, '651B0AC23F', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(16, '5C34DB178A', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(17, '683529B410', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(18, 'C1D92FE853', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(19, '1E70328AD5', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(20, '0E6D7249C5', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(21, '1EF3B2DA09', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(22, 'B852A7E01D', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(23, '4D12B0ACF5', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(24, '3C95F807BA', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(25, '7814BCA62E', NULL, 'Pending', NULL, NULL, '26/08/2022 12:24:56', NULL, NULL, 'Ken220', 'oZhtHpFV6sMPGnRv', '2022-08-26 11:24:56', '2022-08-26 17:11:57'),
(77, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 10:44:04', NULL, NULL, 'Ken220', 'MaAjHtXc4KOZ5I0V', '2022-09-01 09:44:04', '2022-09-01 09:44:04'),
(78, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 10:44:04', NULL, NULL, 'Ken220', 'MaAjHtXc4KOZ5I0V', '2022-09-01 09:44:04', '2022-09-01 09:44:04'),
(79, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 10:44:04', NULL, NULL, 'Ken220', 'MaAjHtXc4KOZ5I0V', '2022-09-01 09:44:04', '2022-09-01 09:44:04'),
(80, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 10:44:04', NULL, NULL, 'Ken220', 'MaAjHtXc4KOZ5I0V', '2022-09-01 09:44:04', '2022-09-01 09:44:04'),
(81, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 10:44:04', NULL, NULL, 'Ken220', 'MaAjHtXc4KOZ5I0V', '2022-09-01 09:44:04', '2022-09-01 09:44:04'),
(82, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 10:44:04', NULL, NULL, 'Ken220', 'MaAjHtXc4KOZ5I0V', '2022-09-01 09:44:04', '2022-09-01 09:44:04'),
(83, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 10:44:04', NULL, NULL, 'Ken220', 'MaAjHtXc4KOZ5I0V', '2022-09-01 09:44:04', '2022-09-01 09:44:04'),
(84, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 10:46:39', NULL, NULL, 'Ken220', 'ysRZFL0bK1qoDw8J', '2022-09-01 09:46:39', '2022-09-01 09:46:39'),
(85, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 10:46:39', NULL, NULL, 'Ken220', 'ysRZFL0bK1qoDw8J', '2022-09-01 09:46:39', '2022-09-01 09:46:39'),
(86, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 10:46:39', NULL, NULL, 'Ken220', 'ysRZFL0bK1qoDw8J', '2022-09-01 09:46:39', '2022-09-01 09:46:39'),
(87, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 10:46:39', NULL, NULL, 'Ken220', 'ysRZFL0bK1qoDw8J', '2022-09-01 09:46:39', '2022-09-01 09:46:39'),
(88, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 10:46:39', NULL, NULL, 'Ken220', 'ysRZFL0bK1qoDw8J', '2022-09-01 09:46:39', '2022-09-01 09:46:39'),
(89, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 10:46:39', NULL, NULL, 'Ken220', 'ysRZFL0bK1qoDw8J', '2022-09-01 09:46:39', '2022-09-01 09:46:39'),
(90, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 10:46:39', NULL, NULL, 'Ken220', 'ysRZFL0bK1qoDw8J', '2022-09-01 09:46:39', '2022-09-01 09:46:39'),
(91, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 10:47:16', NULL, NULL, 'Ken220', 'zVIpJ1N4nRPi0LhQ', '2022-09-01 09:47:16', '2022-09-01 09:47:16'),
(92, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 10:47:16', NULL, NULL, 'Ken220', 'zVIpJ1N4nRPi0LhQ', '2022-09-01 09:47:16', '2022-09-01 09:47:16'),
(93, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 10:47:16', NULL, NULL, 'Ken220', 'zVIpJ1N4nRPi0LhQ', '2022-09-01 09:47:16', '2022-09-01 09:47:16'),
(94, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 10:47:16', NULL, NULL, 'Ken220', 'zVIpJ1N4nRPi0LhQ', '2022-09-01 09:47:16', '2022-09-01 09:47:16'),
(95, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 10:47:16', NULL, NULL, 'Ken220', 'zVIpJ1N4nRPi0LhQ', '2022-09-01 09:47:16', '2022-09-01 09:47:16'),
(96, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 10:47:16', NULL, NULL, 'Ken220', 'zVIpJ1N4nRPi0LhQ', '2022-09-01 09:47:16', '2022-09-01 09:47:16'),
(97, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 10:47:16', NULL, NULL, 'Ken220', 'zVIpJ1N4nRPi0LhQ', '2022-09-01 09:47:16', '2022-09-01 09:47:16'),
(98, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 10:50:24', NULL, NULL, 'Ken220', 'gf3y9mHhnrVRlBoW', '2022-09-01 09:50:24', '2022-09-01 09:50:24'),
(99, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 10:50:24', NULL, NULL, 'Ken220', 'gf3y9mHhnrVRlBoW', '2022-09-01 09:50:24', '2022-09-01 09:50:24'),
(100, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 10:50:24', NULL, NULL, 'Ken220', 'gf3y9mHhnrVRlBoW', '2022-09-01 09:50:24', '2022-09-01 09:50:24'),
(101, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 10:50:24', NULL, NULL, 'Ken220', 'gf3y9mHhnrVRlBoW', '2022-09-01 09:50:24', '2022-09-01 09:50:24'),
(102, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 10:50:24', NULL, NULL, 'Ken220', 'gf3y9mHhnrVRlBoW', '2022-09-01 09:50:24', '2022-09-01 09:50:24'),
(103, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 10:50:24', NULL, NULL, 'Ken220', 'gf3y9mHhnrVRlBoW', '2022-09-01 09:50:24', '2022-09-01 09:50:24'),
(104, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 10:50:24', NULL, NULL, 'Ken220', 'gf3y9mHhnrVRlBoW', '2022-09-01 09:50:24', '2022-09-01 09:50:24'),
(105, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 10:51:06', NULL, NULL, 'Ken220', 'SGdl9cJmKHZBRePk', '2022-09-01 09:51:06', '2022-09-01 09:51:06'),
(106, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 10:51:06', NULL, NULL, 'Ken220', 'SGdl9cJmKHZBRePk', '2022-09-01 09:51:06', '2022-09-01 09:51:06'),
(107, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 10:51:06', NULL, NULL, 'Ken220', 'SGdl9cJmKHZBRePk', '2022-09-01 09:51:06', '2022-09-01 09:51:06'),
(108, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 10:51:06', NULL, NULL, 'Ken220', 'SGdl9cJmKHZBRePk', '2022-09-01 09:51:06', '2022-09-01 09:51:06'),
(109, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 10:51:06', NULL, NULL, 'Ken220', 'SGdl9cJmKHZBRePk', '2022-09-01 09:51:06', '2022-09-01 09:51:06'),
(110, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 10:51:06', NULL, NULL, 'Ken220', 'SGdl9cJmKHZBRePk', '2022-09-01 09:51:06', '2022-09-01 09:51:06'),
(111, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 10:51:06', NULL, NULL, 'Ken220', 'SGdl9cJmKHZBRePk', '2022-09-01 09:51:06', '2022-09-01 09:51:06'),
(112, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 10:55:23', NULL, NULL, 'Ken220', 'c9OwXYBH7mUv5QKr', '2022-09-01 09:55:23', '2022-09-01 09:55:23'),
(113, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 10:55:23', NULL, NULL, 'Ken220', 'c9OwXYBH7mUv5QKr', '2022-09-01 09:55:23', '2022-09-01 09:55:23'),
(114, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 10:55:23', NULL, NULL, 'Ken220', 'c9OwXYBH7mUv5QKr', '2022-09-01 09:55:23', '2022-09-01 09:55:23'),
(115, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 10:55:23', NULL, NULL, 'Ken220', 'c9OwXYBH7mUv5QKr', '2022-09-01 09:55:23', '2022-09-01 09:55:23'),
(116, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 10:55:23', NULL, NULL, 'Ken220', 'c9OwXYBH7mUv5QKr', '2022-09-01 09:55:23', '2022-09-01 09:55:23'),
(117, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 10:55:23', NULL, NULL, 'Ken220', 'c9OwXYBH7mUv5QKr', '2022-09-01 09:55:23', '2022-09-01 09:55:23'),
(118, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 10:55:23', NULL, NULL, 'Ken220', 'c9OwXYBH7mUv5QKr', '2022-09-01 09:55:23', '2022-09-01 09:55:23'),
(119, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 10:58:20', NULL, NULL, 'Ken220', 'TLYBnzZe6FsWhERp', '2022-09-01 09:58:20', '2022-09-01 09:58:20'),
(120, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 10:58:20', NULL, NULL, 'Ken220', 'TLYBnzZe6FsWhERp', '2022-09-01 09:58:20', '2022-09-01 09:58:20'),
(121, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 10:58:20', NULL, NULL, 'Ken220', 'TLYBnzZe6FsWhERp', '2022-09-01 09:58:20', '2022-09-01 09:58:20'),
(122, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 10:58:20', NULL, NULL, 'Ken220', 'TLYBnzZe6FsWhERp', '2022-09-01 09:58:20', '2022-09-01 09:58:20'),
(123, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 10:58:20', NULL, NULL, 'Ken220', 'TLYBnzZe6FsWhERp', '2022-09-01 09:58:20', '2022-09-01 09:58:20'),
(124, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 10:58:20', NULL, NULL, 'Ken220', 'TLYBnzZe6FsWhERp', '2022-09-01 09:58:20', '2022-09-01 09:58:20'),
(125, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 10:58:20', NULL, NULL, 'Ken220', 'TLYBnzZe6FsWhERp', '2022-09-01 09:58:20', '2022-09-01 09:58:20'),
(126, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:04', NULL, NULL, 'Ken220', 'Zsp5L1E907VRQPeA', '2022-09-01 10:03:04', '2022-09-01 10:03:04'),
(127, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:04', NULL, NULL, 'Ken220', 'Zsp5L1E907VRQPeA', '2022-09-01 10:03:04', '2022-09-01 10:03:04'),
(128, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:04', NULL, NULL, 'Ken220', 'Zsp5L1E907VRQPeA', '2022-09-01 10:03:04', '2022-09-01 10:03:04'),
(129, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:04', NULL, NULL, 'Ken220', 'Zsp5L1E907VRQPeA', '2022-09-01 10:03:04', '2022-09-01 10:03:04'),
(130, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:04', NULL, NULL, 'Ken220', 'Zsp5L1E907VRQPeA', '2022-09-01 10:03:04', '2022-09-01 10:03:04'),
(131, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:04', NULL, NULL, 'Ken220', 'Zsp5L1E907VRQPeA', '2022-09-01 10:03:04', '2022-09-01 10:03:04'),
(132, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:04', NULL, NULL, 'Ken220', 'Zsp5L1E907VRQPeA', '2022-09-01 10:03:04', '2022-09-01 10:03:04'),
(133, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:09', NULL, NULL, 'Ken220', 'BeSpMi6OrvxDg4w1', '2022-09-01 10:03:09', '2022-09-01 10:03:09'),
(134, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:09', NULL, NULL, 'Ken220', 'BeSpMi6OrvxDg4w1', '2022-09-01 10:03:09', '2022-09-01 10:03:09'),
(135, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:09', NULL, NULL, 'Ken220', 'BeSpMi6OrvxDg4w1', '2022-09-01 10:03:09', '2022-09-01 10:03:09'),
(136, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:09', NULL, NULL, 'Ken220', 'BeSpMi6OrvxDg4w1', '2022-09-01 10:03:09', '2022-09-01 10:03:09'),
(137, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:09', NULL, NULL, 'Ken220', 'BeSpMi6OrvxDg4w1', '2022-09-01 10:03:09', '2022-09-01 10:03:09'),
(138, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:09', NULL, NULL, 'Ken220', 'BeSpMi6OrvxDg4w1', '2022-09-01 10:03:09', '2022-09-01 10:03:09'),
(139, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 11:03:09', NULL, NULL, 'Ken220', 'BeSpMi6OrvxDg4w1', '2022-09-01 10:03:09', '2022-09-01 10:03:09'),
(140, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 11:04:34', NULL, NULL, 'Ken220', 't7TpI5oRy0ZS1wi6', '2022-09-01 10:04:34', '2022-09-01 10:04:34'),
(141, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 11:04:34', NULL, NULL, 'Ken220', 't7TpI5oRy0ZS1wi6', '2022-09-01 10:04:34', '2022-09-01 10:04:34'),
(142, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 11:04:34', NULL, NULL, 'Ken220', 't7TpI5oRy0ZS1wi6', '2022-09-01 10:04:34', '2022-09-01 10:04:34'),
(143, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 11:04:34', NULL, NULL, 'Ken220', 't7TpI5oRy0ZS1wi6', '2022-09-01 10:04:34', '2022-09-01 10:04:34'),
(144, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 11:04:34', NULL, NULL, 'Ken220', 't7TpI5oRy0ZS1wi6', '2022-09-01 10:04:34', '2022-09-01 10:04:34'),
(145, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 11:04:34', NULL, NULL, 'Ken220', 't7TpI5oRy0ZS1wi6', '2022-09-01 10:04:34', '2022-09-01 10:04:34'),
(146, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 11:04:34', NULL, NULL, 'Ken220', 't7TpI5oRy0ZS1wi6', '2022-09-01 10:04:34', '2022-09-01 10:04:34'),
(147, 'B381C76D05', NULL, 'Pending', NULL, NULL, '01/09/2022 11:06:22', NULL, NULL, 'Ken220', '4HekmTRKqfbjX9Wl', '2022-09-01 10:06:22', '2022-09-01 10:06:22'),
(148, '2DE794538A', NULL, 'Pending', NULL, NULL, '01/09/2022 11:06:22', NULL, NULL, 'Ken220', '4HekmTRKqfbjX9Wl', '2022-09-01 10:06:22', '2022-09-01 10:06:22'),
(149, '1EDC93A85B', NULL, 'Pending', NULL, NULL, '01/09/2022 11:06:22', NULL, NULL, 'Ken220', '4HekmTRKqfbjX9Wl', '2022-09-01 10:06:22', '2022-09-01 10:06:22'),
(150, 'A7B48361E0', NULL, 'Pending', NULL, NULL, '01/09/2022 11:06:22', NULL, NULL, 'Ken220', '4HekmTRKqfbjX9Wl', '2022-09-01 10:06:22', '2022-09-01 10:06:22'),
(151, 'AE071529BC', NULL, 'Pending', NULL, NULL, '01/09/2022 11:06:22', NULL, NULL, 'Ken220', '4HekmTRKqfbjX9Wl', '2022-09-01 10:06:22', '2022-09-01 10:06:22'),
(152, 'john', NULL, 'Pending', NULL, NULL, '01/09/2022 11:06:22', NULL, NULL, 'Ken220', '4HekmTRKqfbjX9Wl', '2022-09-01 10:06:22', '2022-09-01 10:06:22'),
(153, 'perry', NULL, 'Pending', NULL, NULL, '01/09/2022 11:06:22', NULL, NULL, 'Ken220', '4HekmTRKqfbjX9Wl', '2022-09-01 10:06:22', '2022-09-01 10:06:22');

-- --------------------------------------------------------

--
-- Table structure for table `graduations`
--

CREATE TABLE `graduations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `g_st_admin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_st_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_added` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `graduations`
--

INSERT INTO `graduations` (`id`, `g_st_admin`, `g_st_name`, `g_class`, `g_year`, `g_status`, `g_added`, `g_tid`, `g_date`, `created_at`, `updated_at`) VALUES
(5, 'wewewe333', 'regerg', 'JSS 3A', '2013/2014', 'Graduated', 'Ken220', 'oHr913Lq0gUwmcOh', '24/08/2022 20:52:24', NULL, NULL),
(6, 'ICC/90998/09', 'Ken Developer Uwadia', 'JSS 3A', '2013/2014', 'Graduated', 'Ken220', 'oHr913Lq0gUwmcOh', '24/08/2022 20:54:01', NULL, NULL),
(7, 'CS/30303', 'fdfvsvs gbfgbgb', 'JSS 3A', '2013/2014', 'Graduated', 'Ken220', 'oHr913Lq0gUwmcOh', '24/08/2022 20:54:39', NULL, NULL),
(8, 'wewewe333', 'regerg rgerg', 'JSS 3A', '2013/2014', 'Graduated', 'Ken220', 'oHr913Lq0gUwmcOh', '24/08/2022 21:00:43', NULL, NULL),
(9, 'CS/30303', 'fdfvsvs gbfgbgb', 'JSS 3A', '2013/2014', 'Graduated', 'Ken220', 'oHr913Lq0gUwmcOh', '24/08/2022 21:01:44', NULL, NULL),
(10, 'CS/30303', 'fdfvsvs gbfgbgb', 'JSS 3A', '2015/2016', 'Graduated', 'Ken220', 'TR29XICuGhYeLKqj', '24/08/2022 21:28:53', NULL, NULL),
(11, 'ICC/90998/09', 'Ken Developer Uwadia', 'JSS 3A', '2015/2016', 'Graduated', 'Ken220', 'TR29XICuGhYeLKqj', '24/08/2022 21:28:53', NULL, NULL),
(12, 'wewewe333', 'regerg rgerg', 'JSS 3A', '2015/2016', 'Graduated', 'Ken220', 'TR29XICuGhYeLKqj', '24/08/2022 21:28:53', NULL, NULL),
(13, 'CS/30303', 'fdfvsvs gbfgbgb', 'JSS 3A', '2015/2016', 'Graduated', 'Ken220', 'TR29XICuGhYeLKqj', '24/08/2022 21:34:29', NULL, NULL),
(14, 'ICC/90998/09', 'Ken Developer Uwadia', 'JSS 3A', '2015/2016', 'Graduated', 'Ken220', 'TR29XICuGhYeLKqj', '24/08/2022 21:34:29', NULL, NULL),
(15, 'wewewe333', 'regerg rgerg', 'JSS 3A', '2015/2016', 'Graduated', 'Ken220', 'TR29XICuGhYeLKqj', '24/08/2022 21:34:29', NULL, NULL),
(16, 'CS/30303', 'fdfvsvs gbfgbgb', 'JSS 3A', '2015/2016', 'Graduated', 'Ken220', '9nh8bL3TgsXQkw7c', '24/08/2022 21:51:19', NULL, NULL),
(17, 'ICC/90998/09', 'Ken Developer Uwadia', 'JSS 3A', '2015/2016', 'Graduated', 'Ken220', '9nh8bL3TgsXQkw7c', '24/08/2022 21:51:19', NULL, NULL),
(18, 'wewewe333', 'regerg rgerg', 'JSS 3A', '2015/2016', 'Graduated', 'Ken220', '9nh8bL3TgsXQkw7c', '24/08/2022 21:51:19', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `login_statuses`
--

CREATE TABLE `login_statuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `user_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `login_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `login_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `login_nature` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `login_uid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `login_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `login_role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logg_action` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logout_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `login_statuses`
--

INSERT INTO `login_statuses` (`id`, `user_id`, `user_name`, `login_name`, `login_date`, `login_nature`, `login_uid`, `login_status`, `login_role`, `logg_action`, `logout_date`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ken220', 'Ken Young', '07/09/2022 16:28:38', 'Logout successfully', 'bNJWj2AxDclRY5mLOEhpPd3SwIKyTF', '0', 'Admin', 'Authenticated', '07/09/2022 16:31:29', '2022-09-07 15:28:38', '2022-09-07 15:31:29'),
(2, 1, 'Ken220', 'Ken Young', '07/09/2022 16:31:29', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 15:31:29', '2022-09-07 15:31:29'),
(3, 1, 'Ken220', 'Ken Young', '07/09/2022 16:31:56', 'Logout successfully', '6ScEkUjBWK5YTbF7NDqoI9XQ4rVLln', '0', 'Admin', 'Authenticated', '07/09/2022 16:35:26', '2022-09-07 15:31:56', '2022-09-07 15:35:26'),
(4, 1, 'Ken220', 'Ken Young', '07/09/2022 16:35:26', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 15:35:26', '2022-09-07 15:35:26'),
(5, 1, 'Ken220', 'Ken Young', '07/09/2022 16:35:35', 'Logout successfully', 'vAsiL8jpbKCmGX1n3JkZ9WBSoyTYFE', '0', 'Admin', 'Authenticated', '07/09/2022 16:37:46', '2022-09-07 15:35:35', '2022-09-07 15:37:46'),
(6, 1, 'Ken220', 'Ken Young', '07/09/2022 16:37:46', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 15:37:46', '2022-09-07 15:37:46'),
(7, 1, 'Ken220', 'Ken Young', '07/09/2022 16:37:55', 'Logout successfully', 'A42dr5yxe0tiaHLKsVzpIjEPQ7NGh6', '0', 'Admin', 'Authenticated', '07/09/2022 16:38:30', '2022-09-07 15:37:55', '2022-09-07 15:38:30'),
(8, 1, 'Ken220', 'Ken Young', '07/09/2022 16:38:30', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 15:38:30', '2022-09-07 15:38:30'),
(9, 1, 'Ken220', 'Ken Young', '07/09/2022 16:39:36', 'Logout successfully', '0KypVeaWzG4B6stPIFMXkgRqcZ59Cx', '0', 'Admin', 'Authenticated', '07/09/2022 17:01:04', '2022-09-07 15:39:36', '2022-09-07 16:01:04'),
(10, 1, 'Ken220', 'Ken Young', '07/09/2022 16:42:39', 'Logout successfully', '8yL9UFNp7HX4V2WwGQcsCO13PRZ5uz', '0', 'Admin', 'Authenticated', '07/09/2022 17:01:04', '2022-09-07 15:42:39', '2022-09-07 16:01:04'),
(11, 1, 'Ken220', 'Ken Young', '07/09/2022 16:51:41', 'Logout successfully', 'cXkW9sEaGbJtUhVTBoD3uzjPpfgrIy', '0', 'Admin', 'Authenticated', '07/09/2022 17:01:04', '2022-09-07 15:51:41', '2022-09-07 16:01:04'),
(12, 1, 'Ken220', 'Ken Young', '07/09/2022 16:53:12', 'Logout successfully', 'EcNsozXFrJfhTgWPqwA2LBM0Zyx46H', '0', 'Admin', 'Authenticated', '07/09/2022 17:01:04', '2022-09-07 15:53:12', '2022-09-07 16:01:04'),
(13, 1, 'Ken220', 'Ken Young', '07/09/2022 17:00:08', 'Logout successfully', 'PYQsE3gyizBv7nltbXxAwq5c9ZoVGf', '0', 'Admin', 'Authenticated', '07/09/2022 17:01:04', '2022-09-07 16:00:08', '2022-09-07 16:01:04'),
(14, 1, 'Ken220', 'Ken Young', '07/09/2022 17:01:04', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 16:01:04', '2022-09-07 16:01:04'),
(15, 2, 'Perry30', 'Jerry Perry', '07/09/2022 17:06:35', 'Logout successfully', 'CMwfHzWIihUN3yZp7D9012GasTSO68', '0', 'Teacher', 'Authenticated', '07/09/2022 17:06:43', '2022-09-07 16:06:35', '2022-09-07 16:06:43'),
(16, 2, 'Perry30', 'Jerry Perry', '07/09/2022 17:06:43', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 16:06:43', '2022-09-07 16:06:43'),
(17, 1, 'Ken220', 'Ken Young', '07/09/2022 17:06:48', 'Logout successfully', 'dCzKsvFAnirJOe7EgpyjIo8ZMfDXUl', '0', 'Admin', 'Authenticated', '07/09/2022 17:58:12', '2022-09-07 16:06:48', '2022-09-07 16:58:12'),
(18, 1, 'Ken220', 'Ken Young', '07/09/2022 17:07:01', 'Logout successfully', 'KjhnOExbcipeuoNdk5GXzsC3DyQPY4', '0', 'Admin', 'Authenticated', '07/09/2022 17:58:12', '2022-09-07 16:07:01', '2022-09-07 16:58:12'),
(19, 1, 'Ken220', 'Ken Young', '07/09/2022 17:11:25', 'Logout successfully', '9cVayENjBKfZ8vPhsqizwRGTYkFCon', '0', 'Admin', 'Authenticated', '07/09/2022 17:58:12', '2022-09-07 16:11:25', '2022-09-07 16:58:12'),
(20, 1, 'Ken220', 'Ken Young', '07/09/2022 17:19:17', 'Logout successfully', '9yuzcC3lRJo5qdAXK4ZpxPbT1aLgwD', '0', 'Admin', 'Authenticated', '07/09/2022 17:58:12', '2022-09-07 16:19:17', '2022-09-07 16:58:12'),
(21, 1, 'Ken220', 'Ken Young', '07/09/2022 17:19:52', 'Logout successfully', 'VKaPxUZLD64YQSN9Wk0ctXJi1sm8eM', '0', 'Admin', NULL, '07/09/2022 17:58:12', '2022-09-07 16:19:52', '2022-09-07 16:58:12'),
(23, 1, 'Ken220', 'Ken Young', '07/09/2022 17:58:12', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 16:58:12', '2022-09-07 16:58:12'),
(24, 1, 'Ken220', 'Ken Young', '07/09/2022 17:59:08', 'Logout successfully', '3uBQZ41lUeYIwEqXhkWVLGom5CKaSA', '0', 'Admin', 'Authenticated', '07/09/2022 18:15:04', '2022-09-07 16:59:08', '2022-09-07 17:15:04'),
(25, 1, 'Ken220', 'Ken Young', '07/09/2022 18:01:35', 'Logout successfully', 'WIhLSaBeY1ZXQTKrR38UN6DndowG2j', '0', 'Admin', 'Authenticated', '07/09/2022 18:15:04', '2022-09-07 17:01:35', '2022-09-07 17:15:04'),
(26, 1, 'Ken220', 'Ken Young', '07/09/2022 18:02:53', 'Logout successfully', 'npVHWaCmJYFlsZK5BbRcLUArvjxTI0', '0', 'Admin', 'Authenticated', '07/09/2022 18:15:04', '2022-09-07 17:02:53', '2022-09-07 17:15:04'),
(27, 1, 'Ken220', 'Ken Young', '07/09/2022 18:15:04', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 17:15:04', '2022-09-07 17:15:04'),
(28, 1, 'Ken220', 'Ken Young', '07/09/2022 18:19:10', 'Logout successfully', 'T8tA6m9wqLKIb4s1JGF5ZMEglYHxdr', '0', 'Admin', 'Authenticated', '07/09/2022 18:20:03', '2022-09-07 17:19:10', '2022-09-07 17:20:03'),
(29, 1, 'Ken220', 'Ken Young', '07/09/2022 18:20:03', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 17:20:03', '2022-09-07 17:20:03'),
(30, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:20:29', 'Logout successfully', 'BF2p0WwY4ECMabyA5k6ufvj9rUgQ7d', '0', 'Teacher', 'Authenticated', '07/09/2022 18:52:17', '2022-09-07 17:20:29', '2022-09-07 17:52:17'),
(31, 1, 'Ken220', 'Ken Young', '07/09/2022 18:33:18', 'Logout successfully', 'AcyNH76xotUgd8nIr0L2iFavl1R9Wh', '0', 'Admin', 'Authenticated', '07/09/2022 18:33:43', '2022-09-07 17:33:18', '2022-09-07 17:33:43'),
(32, 1, 'Ken220', 'Ken Young', '07/09/2022 18:33:43', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 17:33:43', '2022-09-07 17:33:43'),
(33, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:33:47', 'Logout successfully', '5u12qdz7QKwYvXNGHZBMnhItVCf68g', '0', 'Teacher', 'Authenticated', '07/09/2022 18:52:17', '2022-09-07 17:33:47', '2022-09-07 17:52:17'),
(34, 1, 'Ken220', 'Ken Young', '07/09/2022 18:44:11', 'Logout successfully', 'qSJLBbPdChNZzXFpEM1a4k96ewmGOc', '0', 'Admin', 'Authenticated', '07/09/2022 18:44:29', '2022-09-07 17:44:11', '2022-09-07 17:44:29'),
(35, 1, 'Ken220', 'Ken Young', '07/09/2022 18:44:29', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 17:44:29', '2022-09-07 17:44:29'),
(36, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:44:36', 'Logout successfully', 'UcN9Zno8XtvaYELH4AseF5RSfw0uJC', '0', 'Teacher', 'Authenticated', '07/09/2022 18:52:17', '2022-09-07 17:44:36', '2022-09-07 17:52:17'),
(37, 1, 'Ken220', 'Ken Young', '07/09/2022 18:45:19', 'Logout successfully', 'Y6hQRp1uwBo9bl5gOaeFJdMCjnHmIL', '0', 'Admin', 'Authenticated', '07/09/2022 18:49:57', '2022-09-07 17:45:19', '2022-09-07 17:49:57'),
(38, 1, 'Ken220', 'Ken Young', '07/09/2022 18:45:53', 'Logout successfully', '3WTmYgKzVoCn5xU7bFpwjyaheAfMk1', '0', 'Admin', 'Authenticated', '07/09/2022 18:49:57', '2022-09-07 17:45:53', '2022-09-07 17:49:57'),
(39, 1, 'Ken220', 'Ken Young', '07/09/2022 18:48:37', 'Logout successfully', 'WcYuEQRX5My98sqC2wVKdbeHZ4DULg', '0', 'Admin', 'Authenticated', '07/09/2022 18:49:57', '2022-09-07 17:48:37', '2022-09-07 17:49:57'),
(40, 1, 'Ken220', 'Ken Young', '07/09/2022 18:49:31', 'Logout successfully', 'idB7I34LbvNkDneW8GhTlVHmQEqOc1', '0', 'Admin', 'Authenticated', '07/09/2022 18:49:57', '2022-09-07 17:49:31', '2022-09-07 17:49:57'),
(41, 1, 'Ken220', 'Ken Young', '07/09/2022 18:49:57', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 17:49:57', '2022-09-07 17:49:57'),
(42, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:50:02', 'Logout successfully', 'sdgfRHvUGAObPtohIjS5XNnq6m1zFr', '0', 'Teacher', 'Authenticated', '07/09/2022 18:52:17', '2022-09-07 17:50:02', '2022-09-07 17:52:17'),
(43, 1, 'Ken220', 'Ken Young', '07/09/2022 18:51:29', 'Logout successfully', 'IAfuCDpd9akXoW3PSVLbEhrZTMcz0l', '0', 'Admin', 'Authenticated', '07/09/2022 18:51:44', '2022-09-07 17:51:29', '2022-09-07 17:51:44'),
(44, 1, 'Ken220', 'Ken Young', '07/09/2022 18:51:44', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 17:51:44', '2022-09-07 17:51:44'),
(45, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:52:03', 'Logout successfully', 'awZxzDkoSKsv5pA18uUiGQRgTB0Xbq', '0', 'Teacher', 'Authenticated', '07/09/2022 18:52:17', '2022-09-07 17:52:03', '2022-09-07 17:52:17'),
(46, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:52:17', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 17:52:17', '2022-09-07 17:52:17'),
(47, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:52:41', 'Logout successfully', 'la1IE7Ojd5YuBA3mgPWHkUtS8Crv6K', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 17:52:41', '2022-09-07 18:07:15'),
(48, 1, 'Ken220', 'Ken Young', '07/09/2022 18:54:05', 'Logout successfully', 'qpAgn1JGQjdvrUibXxyFMf4Y9aDsWO', '0', 'Admin', 'Authenticated', '07/09/2022 18:54:34', '2022-09-07 17:54:05', '2022-09-07 17:54:34'),
(49, 1, 'Ken220', 'Ken Young', '07/09/2022 18:54:34', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 17:54:34', '2022-09-07 17:54:34'),
(50, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:54:41', 'Logout successfully', 'bEtiznRU4ChQ2uG5kvA3fmJ0alwIyS', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 17:54:41', '2022-09-07 18:07:15'),
(51, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:56:11', 'Logout successfully', 'W8CK9f76jHeEr2SbgkGFaJVvutdq5Y', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 17:56:11', '2022-09-07 18:07:15'),
(52, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:56:54', 'Logout successfully', 'odTJlQyvj49DXmI26SqwEZLGAFRfhg', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 17:56:54', '2022-09-07 18:07:15'),
(53, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:57:57', 'Logout successfully', 'v4uMCOmHdiYBx98UWLyskVlSZp6eRF', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 17:57:57', '2022-09-07 18:07:15'),
(54, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 18:58:57', 'Logout successfully', 'ePOgk8VDTbZLodQSFlB59KAWt4Yfmn', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 17:58:57', '2022-09-07 18:07:15'),
(55, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 19:01:21', 'Logout successfully', '4Wag2toc9FEZr6BepDJ3Os5ANjHGih', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 18:01:21', '2022-09-07 18:07:15'),
(56, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 19:02:13', 'Logout successfully', 'o5jzpn0Hqd718GkC6JtMmwRhsWIcUB', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 18:02:13', '2022-09-07 18:07:15'),
(57, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 19:03:47', 'Logout successfully', 'nf4gJhtTRcbkIYDUA7ZjC9ilLK3rSN', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 18:03:47', '2022-09-07 18:07:15'),
(58, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 19:04:25', 'Logout successfully', 'sSotVxbBvNC2h1ujiayn3A90GXKmzL', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 18:04:25', '2022-09-07 18:07:15'),
(59, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 19:05:38', 'Logout successfully', 'FP31nwxSeioX6z4vpHqmO8gKr9l2fM', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 18:05:38', '2022-09-07 18:07:15'),
(60, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 19:07:07', 'Logout successfully', 'IlY10XBxNzhpkwj98q3uE5DVrg6iQZ', '0', 'Teacher', 'Authenticated', '07/09/2022 19:07:15', '2022-09-07 18:07:07', '2022-09-07 18:07:15'),
(61, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 19:07:15', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 18:07:15', '2022-09-07 18:07:15'),
(62, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 19:09:48', 'Logout successfully', 'pVMkOqdsmi0RgZ9eFhS1l6r7AyHnbG', '0', 'Teacher', '', '07/09/2022 19:13:26', '2022-09-07 18:09:48', '2022-09-07 18:13:26'),
(63, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 19:13:03', 'Logout successfully', 'EyLgHj30cNATMv2fkPFRaXV9iKZChB', '0', 'Teacher', '', '07/09/2022 19:13:26', '2022-09-07 18:13:03', '2022-09-07 18:13:26'),
(64, 5, 'vivian', 'Uwadia Vivian', '07/09/2022 19:13:26', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 18:13:26', '2022-09-07 18:13:26'),
(65, 1, 'Ken220', 'Ken Young', '07/09/2022 19:14:13', 'Logout successfully', 'zFHciEG6lU5nXorZeQkTspKuLym8g3', '0', 'Admin', '', '07/09/2022 19:14:22', '2022-09-07 18:14:13', '2022-09-07 18:14:22'),
(66, 1, 'Ken220', 'Ken Young', '07/09/2022 19:14:22', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-07 18:14:22', '2022-09-07 18:14:22'),
(67, 1, 'Ken220', 'Ken Young', '08/09/2022 09:30:52', 'Logout successfully', '8pU9nGoqNO7SAsCDhErPulX3HxI2R6', '0', 'Admin', '', '08/09/2022 09:33:34', '2022-09-08 08:30:52', '2022-09-08 08:33:34'),
(68, 1, 'Ken220', 'Ken Young', '08/09/2022 09:33:34', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-08 08:33:34', '2022-09-08 08:33:34'),
(69, 5, 'vivian', 'Uwadia Vivian', '08/09/2022 09:38:28', 'Logout successfully', 'tfsB37QUPjz6IpxyKG2ZhMoFuLrROV', '0', 'Teacher', '', '08/09/2022 19:44:55', '2022-09-08 08:38:28', '2022-09-08 18:44:55'),
(70, 1, 'Ken220', 'Ken Young', '08/09/2022 12:35:02', 'Logout successfully', 'ZvdknLHisQoFpEfDUVhWSRgAuCMO9X', '0', 'Admin', '', '08/09/2022 15:05:04', '2022-09-08 11:35:02', '2022-09-08 14:05:04'),
(71, 1, 'Ken220', 'Ken Young', '08/09/2022 15:05:04', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-08 14:05:04', '2022-09-08 14:05:04'),
(72, 5, 'vivian', 'Uwadia Vivian', '08/09/2022 15:05:09', 'Logout successfully', 'GpnIou9f1wcLmEHXa6v5WP7lAdQZFT', '0', 'Teacher', '', '08/09/2022 19:44:55', '2022-09-08 14:05:09', '2022-09-08 18:44:55'),
(73, 1, 'Ken220', 'Ken Young', '08/09/2022 15:31:02', 'Logout successfully', 'UjfEZ42WKyRxz6N07sikDYOPgF8So9', '0', 'Admin', '', '08/09/2022 19:44:13', '2022-09-08 14:31:02', '2022-09-08 18:44:13'),
(74, 5, 'vivian', 'Uwadia Vivian', '08/09/2022 18:13:11', 'Logout successfully', 'IajAo6grKZ2JL5GzdbtxqP39BC1OYw', '0', 'Teacher', '', '08/09/2022 19:44:55', '2022-09-08 17:13:11', '2022-09-08 18:44:55'),
(75, 1, 'Ken220', 'Ken Young', '08/09/2022 19:44:13', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-08 18:44:13', '2022-09-08 18:44:13'),
(76, 5, 'vivian', 'Uwadia Vivian', '08/09/2022 19:44:18', 'Logout successfully', 'J7ZtsyVuMB1ebPlTnCS6pk5grKxiXO', '0', 'Teacher', '', '08/09/2022 19:44:55', '2022-09-08 18:44:18', '2022-09-08 18:44:55'),
(77, 5, 'vivian', 'Uwadia Vivian', '08/09/2022 19:44:55', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-08 18:44:55', '2022-09-08 18:44:55'),
(78, 1, 'Ken220', 'Ken Young', '08/09/2022 19:45:08', 'Logout successfully', 'QO5hHTaScpWq0lD8PAjNsEMzLR4G7i', '0', 'Admin', '', '08/09/2022 20:49:33', '2022-09-08 18:45:08', '2022-09-08 19:49:33'),
(79, 5, 'vivian', 'Uwadia Vivian', '08/09/2022 19:51:03', 'Logout successfully', 'UJu8EZvpCTgYx0hF5XckieOBrlfyAS', '0', 'Teacher', '', '08/09/2022 20:49:26', '2022-09-08 18:51:03', '2022-09-08 19:49:26'),
(80, 5, 'vivian', 'Uwadia Vivian', '08/09/2022 20:33:58', 'Logout successfully', 'YlOQ9ZWbI37aMeysNAREx5LhF2Bguq', '0', 'Teacher', '', '08/09/2022 20:49:26', '2022-09-08 19:33:58', '2022-09-08 19:49:26'),
(81, 5, 'vivian', 'Uwadia Vivian', '08/09/2022 20:49:26', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-08 19:49:26', '2022-09-08 19:49:26'),
(82, 1, 'Ken220', 'Ken Young', '08/09/2022 20:49:33', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-08 19:49:33', '2022-09-08 19:49:33'),
(83, 5, 'vivian', 'Uwadia Vivian', '09/09/2022 08:59:25', 'Logout successfully', 'lNGK0Ar7JU1LVfRg6wvHnM4dO8kYxu', '0', 'Teacher', '', '09/09/2022 18:37:29', '2022-09-09 07:59:25', '2022-09-09 17:37:29'),
(84, 1, 'Ken220', 'Ken Young', '09/09/2022 09:03:32', 'Logout successfully', 'AkapOMnYt98QIzr2ZHFD6d5BJuP1hL', '0', 'Admin', '', '09/09/2022 18:39:16', '2022-09-09 08:03:32', '2022-09-09 17:39:16'),
(85, 5, 'vivian', 'Uwadia Vivian', '09/09/2022 09:50:27', 'Logout successfully', 'QO6BXT84SaKvfj2i7uExLMoAYU5bsl', '0', 'Teacher', '', '09/09/2022 18:37:29', '2022-09-09 08:50:27', '2022-09-09 17:37:29'),
(86, 5, 'vivian', 'Uwadia Vivian', '09/09/2022 18:37:29', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-09 17:37:29', '2022-09-09 17:37:29'),
(87, 1, 'Ken220', 'Ken Young', '09/09/2022 18:39:16', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-09 17:39:16', '2022-09-09 17:39:16'),
(88, 1, 'Ken220', 'Ken Young', '09/09/2022 18:39:24', 'Logout successfully', '1O0EHLQfmy6lxcXR4NnAVvzGK7udTi', '0', 'Admin', '', '10/09/2022 18:06:41', '2022-09-09 17:39:24', '2022-09-10 17:06:41'),
(89, 1, 'Ken220', 'Ken Young', '10/09/2022 08:42:52', 'Logout successfully', '4SN5cUa6inf1mYRAwbpy7sjdJFqQxo', '0', 'Admin', '', '10/09/2022 18:06:41', '2022-09-10 07:42:52', '2022-09-10 17:06:41'),
(90, 5, 'vivian', 'Uwadia Vivian', '10/09/2022 08:43:24', 'Logout successfully', 'jyKOadEm3RvzxbG9DFcUA24NsfLl7J', '0', 'Teacher', '', '10/09/2022 18:05:53', '2022-09-10 07:43:24', '2022-09-10 17:05:53'),
(91, 5, 'vivian', 'Uwadia Vivian', '10/09/2022 14:19:31', 'Logout successfully', 'f84a70mxXHUDwrlyWkMEbiVgLK5YQN', '0', 'Teacher', '', '10/09/2022 18:05:53', '2022-09-10 13:19:31', '2022-09-10 17:05:53'),
(92, 5, 'vivian', 'Uwadia Vivian', '10/09/2022 18:05:53', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-10 17:05:53', '2022-09-10 17:05:53'),
(93, 1, 'Ken220', 'Ken Young', '10/09/2022 18:06:41', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-10 17:06:41', '2022-09-10 17:06:41'),
(94, 1, 'Ken220', 'Ken Young', '11/09/2022 13:05:34', 'Logout successfully', 'YWKJIQ7L2PzArhwCtqju8g0aUSliHB', '0', 'Admin', '', '11/09/2022 16:42:59', '2022-09-11 12:05:34', '2022-09-11 15:42:59'),
(95, 5, 'vivian', 'Uwadia Vivian', '11/09/2022 13:05:45', 'Logout successfully', '2VMdgkbmqP6iB9n4AFYIUKlyGcxh8E', '0', 'Teacher', '', '11/09/2022 16:42:51', '2022-09-11 12:05:45', '2022-09-11 15:42:51'),
(96, 5, 'vivian', 'Uwadia Vivian', '11/09/2022 16:42:51', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-11 15:42:51', '2022-09-11 15:42:51'),
(97, 1, 'Ken220', 'Ken Young', '11/09/2022 16:42:59', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-11 15:42:59', '2022-09-11 15:42:59'),
(98, 5, 'vivian', 'Uwadia Vivian', '12/09/2022 09:10:32', 'Logout successfully', 'VKkFhsPCHMgBNS6lquD5ton1UwipAe', '0', 'Teacher', '', '12/09/2022 11:21:36', '2022-09-12 08:10:32', '2022-09-12 10:21:36'),
(99, 1, 'Ken220', 'Ken Young', '12/09/2022 10:40:23', 'Logout successfully', 'd4Mytk6ON5VJu1TsRILWEUjPaGgoh2', '0', 'Admin', '', '12/09/2022 10:41:09', '2022-09-12 09:40:23', '2022-09-12 09:41:09'),
(100, 1, 'Ken220', 'Ken Young', '12/09/2022 10:41:09', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 09:41:09', '2022-09-12 09:41:09'),
(101, 1, 'Ken220', 'Ken Young', '12/09/2022 11:00:10', 'Logout successfully', 'U0jMROfn3cNqzwZkDmrWEVlQdoxhCe', '0', 'Admin', '', '12/09/2022 11:21:21', '2022-09-12 10:00:10', '2022-09-12 10:21:21'),
(102, 1, 'Ken220', 'Ken Young', '12/09/2022 11:21:21', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 10:21:21', '2022-09-12 10:21:21'),
(103, 5, 'vivian', 'Uwadia Vivian', '12/09/2022 11:21:36', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 10:21:36', '2022-09-12 10:21:36'),
(104, 1, 'Ken220', 'Ken Young', '12/09/2022 11:21:42', 'Logout successfully', 'RvJj7892IEBYKC1qWwNemhLcMSQUny', '0', 'Admin', '', '12/09/2022 11:39:21', '2022-09-12 10:21:42', '2022-09-12 10:39:21'),
(105, 1, 'Ken220', 'Ken Young', '12/09/2022 11:39:21', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 10:39:21', '2022-09-12 10:39:21'),
(106, 1, 'Ken220', 'Ken Young', '12/09/2022 12:28:14', 'Logout successfully', 'Q1072pWSjoGO5yBT3Jkim8uP6Zcvgz', '0', 'Admin', '', '12/09/2022 12:37:36', '2022-09-12 11:28:14', '2022-09-12 11:37:36'),
(107, 1, 'Ken220', 'Ken Young', '12/09/2022 12:33:24', 'Logout successfully', '9oI5pNUBZ8cxELnmq2lbTDwKQu7C3k', '0', 'Admin', '', '12/09/2022 12:37:36', '2022-09-12 11:33:24', '2022-09-12 11:37:36'),
(108, 1, 'Ken220', 'Ken Young', '12/09/2022 12:37:36', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 11:37:36', '2022-09-12 11:37:36'),
(109, 7, NULL, NULL, '12/09/2022 12:43:17', 'Logout successfully', '5tB0PJSGlUMXaA2dQnwR3CH9W71qFf', '0', 'Student', '', '12/09/2022 17:36:05', '2022-09-12 11:43:17', '2022-09-12 16:36:05'),
(110, 1, 'Ken220', 'Ken Young', '12/09/2022 12:52:54', 'Logout successfully', 'kJxPDq8AIbep6uGLo2WEiK4RUQsrnz', '0', 'Admin', '', '12/09/2022 13:21:38', '2022-09-12 11:52:54', '2022-09-12 12:21:38'),
(111, 1, 'Ken220', 'Ken Young', '12/09/2022 13:21:38', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 12:21:38', '2022-09-12 12:21:38'),
(112, 1, 'Ken220', 'Ken Young', '12/09/2022 13:21:44', 'Logout successfully', 'A0VuD9zQOWGbcapHeTqvFZJKsNx2gf', '0', 'Admin', '', '12/09/2022 17:23:20', '2022-09-12 12:21:44', '2022-09-12 16:23:20'),
(113, 1, 'Ken220', 'Ken Young', '12/09/2022 17:23:20', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 16:23:20', '2022-09-12 16:23:20'),
(114, 1, 'Ken220', 'Ken Young', '12/09/2022 17:23:26', 'Logout successfully', 'v7zLOHtlDa5G3oifUJNcYkAxFbeVus', '0', 'Admin', '', '12/09/2022 17:23:45', '2022-09-12 16:23:26', '2022-09-12 16:23:45'),
(115, 1, 'Ken220', 'Ken Young', '12/09/2022 17:23:45', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 16:23:45', '2022-09-12 16:23:45'),
(116, 5, 'vivian', 'Uwadia Vivian', '12/09/2022 17:23:50', 'Logout successfully', 'OTXtBAHUbNqKe41x0yI8hCMgcGsFSk', '0', 'Teacher', '', '13/09/2022 19:11:56', '2022-09-12 16:23:50', '2022-09-13 18:11:56'),
(117, 1, 'Ken220', 'Ken Young', '12/09/2022 17:24:09', 'Logout successfully', '2RvgdPW56qjzAHVk8EZcTB0KsQYu7x', '0', 'Admin', '', '12/09/2022 17:27:29', '2022-09-12 16:24:09', '2022-09-12 16:27:29'),
(118, 1, 'Ken220', 'Ken Young', '12/09/2022 17:27:29', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 16:27:29', '2022-09-12 16:27:29'),
(119, 7, NULL, NULL, '12/09/2022 17:35:52', 'Logout successfully', 'Qaf4F7B0HZ8P29h5OieGtLsvYWXyg1', '0', 'Student', '', '12/09/2022 17:36:05', '2022-09-12 16:35:52', '2022-09-12 16:36:05'),
(120, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 17:36:05', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 16:36:05', '2022-09-12 16:36:05'),
(121, 7, NULL, NULL, '12/09/2022 17:39:34', 'Logout successfully', 'P0nAwFxikKHpJCzyYm2OgUr9f4Svqu', '0', 'Student', '', '12/09/2022 17:39:46', '2022-09-12 16:39:34', '2022-09-12 16:39:46'),
(122, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 17:39:46', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 16:39:46', '2022-09-12 16:39:46'),
(123, 7, NULL, NULL, '12/09/2022 17:42:36', 'Logout successfully', '5VJBiMtgYQ0wSxDG9hkrAsnHLm6dyX', '0', 'Student', '', '12/09/2022 17:42:50', '2022-09-12 16:42:36', '2022-09-12 16:42:50'),
(124, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 17:42:50', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 16:42:50', '2022-09-12 16:42:50'),
(125, 7, NULL, NULL, '12/09/2022 17:43:33', 'Logout successfully', 'lxSbNEignYIs5PkX6hTj9u8t3yC2Bw', '0', 'Student', '', '12/09/2022 17:43:41', '2022-09-12 16:43:33', '2022-09-12 16:43:41'),
(126, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 17:43:41', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 16:43:41', '2022-09-12 16:43:41'),
(127, 7, NULL, NULL, '12/09/2022 17:46:11', 'Logout successfully', 'jpaxAwhky1i79VsIz2evCFJRqfHuKl', '0', 'Student', '', '12/09/2022 17:46:56', '2022-09-12 16:46:11', '2022-09-12 16:46:56'),
(128, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 17:46:56', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 16:46:56', '2022-09-12 16:46:56'),
(129, 7, NULL, NULL, '12/09/2022 17:49:16', 'Logout successfully', 'kvOSCUxbs4Tu9N62wZlrp7HJ8EX31j', '0', 'Student', '', '12/09/2022 17:50:18', '2022-09-12 16:49:16', '2022-09-12 16:50:18'),
(130, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 17:50:18', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 16:50:18', '2022-09-12 16:50:18'),
(131, 7, NULL, NULL, '12/09/2022 17:58:48', 'Logout successfully', 'yCgmGY8pMBSOLZFN1fAatrlEXxhQsq', '0', 'Student', '', '12/09/2022 17:59:03', '2022-09-12 16:58:48', '2022-09-12 16:59:03'),
(132, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 17:59:03', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 16:59:03', '2022-09-12 16:59:03'),
(133, 7, NULL, NULL, '12/09/2022 18:02:36', 'Logout successfully', 'nh7cEMQb2PsABUyG1aezd6Vw4Cxvqt', '0', 'Student', '', '12/09/2022 18:02:50', '2022-09-12 17:02:36', '2022-09-12 17:02:50'),
(134, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:02:50', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:02:50', '2022-09-12 17:02:50'),
(135, 7, NULL, NULL, '12/09/2022 18:04:12', 'Logout successfully', 'Dd54lgmQZGiaqXswkRteHA3NPOUEVj', '0', 'Student', '', '12/09/2022 18:04:19', '2022-09-12 17:04:12', '2022-09-12 17:04:19'),
(136, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:04:19', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:04:19', '2022-09-12 17:04:19'),
(137, 7, NULL, NULL, '12/09/2022 18:10:36', 'Logout successfully', '6BmHPznJ51N2qgKlroAjwUEC0RFM79', '0', 'Student', '', '12/09/2022 18:10:59', '2022-09-12 17:10:36', '2022-09-12 17:10:59'),
(138, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:10:59', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:10:59', '2022-09-12 17:10:59'),
(139, 7, NULL, NULL, '12/09/2022 18:12:38', 'Logout successfully', 'z5rK1dtoyZlDRvLQiW4mFP0wHfOVxk', '0', 'Student', '', '12/09/2022 18:12:46', '2022-09-12 17:12:38', '2022-09-12 17:12:46'),
(140, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:12:46', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:12:46', '2022-09-12 17:12:46'),
(141, 7, NULL, NULL, '12/09/2022 18:13:18', 'Logout successfully', '0jMHV8hJfLmK7lSiBZDecAIT4ayqOU', '0', 'Student', '', '12/09/2022 18:13:28', '2022-09-12 17:13:18', '2022-09-12 17:13:28'),
(142, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:13:28', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:13:28', '2022-09-12 17:13:28'),
(143, 7, NULL, NULL, '12/09/2022 18:15:46', 'Logout successfully', 'xFkSTmnvXePZwufbEB9pKdMq5iR1Yt', '0', 'Student', '', '12/09/2022 18:16:21', '2022-09-12 17:15:46', '2022-09-12 17:16:21'),
(144, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:16:21', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:16:21', '2022-09-12 17:16:21'),
(145, 7, NULL, NULL, '12/09/2022 18:16:43', 'Logout successfully', 'YDBXOzRPV05KCy6jsdQpTW4A3J9HEc', '0', 'Student', '', '12/09/2022 18:17:41', '2022-09-12 17:16:43', '2022-09-12 17:17:41'),
(146, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:17:41', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:17:41', '2022-09-12 17:17:41'),
(147, 7, NULL, NULL, '12/09/2022 18:20:18', 'Logout successfully', 'k8vROSJLb4xm2WunBjfXYaHsyF1d6l', '0', 'Student', '', '12/09/2022 18:20:26', '2022-09-12 17:20:18', '2022-09-12 17:20:26'),
(148, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:20:26', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:20:26', '2022-09-12 17:20:26'),
(149, 7, NULL, NULL, '12/09/2022 18:21:44', 'Logout successfully', 'MeZqPRIFfx9pQCVO3rYtE4BLKuzgdn', '0', 'Student', '', '12/09/2022 18:21:51', '2022-09-12 17:21:44', '2022-09-12 17:21:51'),
(150, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:21:51', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:21:51', '2022-09-12 17:21:51'),
(151, 7, NULL, NULL, '12/09/2022 18:22:06', 'Logout successfully', 't8TfGUCFBkc1OduSIZM95nNHls4qxb', '0', 'Student', '', '12/09/2022 18:22:14', '2022-09-12 17:22:06', '2022-09-12 17:22:14'),
(152, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:22:14', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:22:14', '2022-09-12 17:22:14'),
(153, 7, NULL, NULL, '12/09/2022 18:24:03', 'Logout successfully', '8JwzOtZIcQ907HXABEYFuUSelfTx15', '0', 'Student', '', '12/09/2022 18:24:41', '2022-09-12 17:24:03', '2022-09-12 17:24:41'),
(154, 7, 'SS/P/2022', 'Peter Uwadia', '12/09/2022 18:24:41', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-12 17:24:41', '2022-09-12 17:24:41'),
(155, 7, NULL, NULL, '12/09/2022 18:26:28', 'Logout successfully', 'mNKrWfqbCZyBGOI9Xihw7zVcElu3p2', '0', 'Student', '', '13/09/2022 09:21:01', '2022-09-12 17:26:28', '2022-09-13 08:21:01'),
(156, 7, NULL, NULL, '13/09/2022 08:56:08', 'Logout successfully', 'GfOH9pZcjodEe35uYTqUIvRsVkP6Qn', '0', 'Student', '', '13/09/2022 09:21:01', '2022-09-13 07:56:08', '2022-09-13 08:21:01'),
(157, 5, 'vivian', 'Uwadia Vivian', '13/09/2022 08:57:54', 'Logout successfully', 'KRtCzWkD61VNdQJ9gGUOYHmFZnuXPh', '0', 'Teacher', '', '13/09/2022 19:11:56', '2022-09-13 07:57:54', '2022-09-13 18:11:56'),
(158, 7, 'SS/P/2022', 'Peter Uwadia', '13/09/2022 09:21:01', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-13 08:21:01', '2022-09-13 08:21:01'),
(159, 7, NULL, NULL, '13/09/2022 09:21:37', 'Logout successfully', 'Nh14QnKxCDpFZvylMTHbJkLjo0ietz', '0', 'Student', '', '13/09/2022 10:56:00', '2022-09-13 08:21:37', '2022-09-13 09:56:00'),
(160, 7, 'SS/P/2022', 'Peter Uwadia', '13/09/2022 10:56:00', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-13 09:56:00', '2022-09-13 09:56:00'),
(161, 7, 'SS/P/2022', NULL, '13/09/2022 10:56:38', 'Logout successfully', 'pSo3HmFQkyN1dZMtYJKnEW5PuzULTi', '0', 'Student', '', '13/09/2022 10:59:55', '2022-09-13 09:56:38', '2022-09-13 09:59:55'),
(162, 7, 'SS/P/2022', 'Peter Uwadia', '13/09/2022 10:59:55', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-13 09:59:55', '2022-09-13 09:59:55'),
(163, 7, 'SS/P/2022', NULL, '13/09/2022 11:02:41', 'Logout successfully', 'YKSvM6WBXAs3njgNzoxkIPG4L7Za5m', '0', 'Student', '', '13/09/2022 11:03:11', '2022-09-13 10:02:41', '2022-09-13 10:03:11'),
(164, 7, 'SS/P/2022', 'Peter Uwadia', '13/09/2022 11:03:11', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-13 10:03:11', '2022-09-13 10:03:11'),
(165, 7, 'SS/P/2022', NULL, '13/09/2022 11:03:19', 'Logout successfully', 'kRCo4wNpeYWJnQz6A8UMKZlhyD2bOd', '0', 'Student', '', '13/09/2022 11:15:39', '2022-09-13 10:03:19', '2022-09-13 10:15:39'),
(166, 7, 'SS/P/2022', 'Peter Uwadia', '13/09/2022 11:15:39', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-13 10:15:39', '2022-09-13 10:15:39'),
(167, 7, 'SS/P/2022', NULL, '13/09/2022 11:15:57', 'Logout successfully', 'ldcfCH53pGSu92V7sPnLkBvgItxNXW', '0', 'Student', '', '13/09/2022 11:25:32', '2022-09-13 10:15:57', '2022-09-13 10:25:32'),
(168, 7, 'SS/P/2022', 'Peter Uwadia', '13/09/2022 11:25:32', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-13 10:25:32', '2022-09-13 10:25:32'),
(169, 7, 'SS/P/2022', NULL, '13/09/2022 11:26:03', 'Logout successfully', 'kOABFty9eKTIfcw840QuCPXhlZnjJW', '0', 'Student', '', '13/09/2022 19:13:59', '2022-09-13 10:26:03', '2022-09-13 18:13:59'),
(170, 5, 'vivian', 'Uwadia Vivian', '13/09/2022 19:11:56', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-13 18:11:56', '2022-09-13 18:11:56'),
(171, 7, 'SS/P/2022', 'Peter Uwadia', '13/09/2022 19:13:59', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-13 18:13:59', '2022-09-13 18:13:59'),
(172, 5, 'vivian', 'Uwadia Vivian', '14/09/2022 07:44:57', 'Logout successfully', 'OpHfgTRhwY3PJ2ysAdQ05cMKxD7bS8', '0', 'Teacher', '', '14/09/2022 10:14:38', '2022-09-14 06:44:57', '2022-09-14 09:14:38'),
(173, 7, 'SS/P/2022', NULL, '14/09/2022 07:51:19', 'Logout successfully', 'SJBAEIyLsM7Wbp4hg31GTf9RacekxD', '0', 'Student', '', '14/09/2022 09:10:46', '2022-09-14 06:51:19', '2022-09-14 08:10:46'),
(174, 7, 'SS/P/2022', 'Peter Uwadia', '14/09/2022 09:10:46', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-14 08:10:46', '2022-09-14 08:10:46'),
(175, 5, 'vivian', 'Uwadia Vivian', '14/09/2022 09:10:58', 'Logout successfully', '9ywcPtsRrqQWHeLuvGb2lxKjfI1dUa', '0', 'Teacher', '', '14/09/2022 10:14:38', '2022-09-14 08:10:58', '2022-09-14 09:14:38'),
(176, 5, 'vivian', 'Uwadia Vivian', '14/09/2022 10:14:38', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-14 09:14:38', '2022-09-14 09:14:38'),
(177, 7, 'SS/P/2022', NULL, '14/09/2022 10:15:13', 'Logout successfully', 'MiGQawFmeT3Sp9L6PlNEdkynIJ0UtO', '0', 'Student', '', '14/09/2022 12:57:59', '2022-09-14 09:15:13', '2022-09-14 11:57:59'),
(178, 5, 'vivian', 'Uwadia Vivian', '14/09/2022 10:17:39', 'Logout successfully', '8n6VmKLNqXRGYjiEeraDOASvhdFbl0', '0', 'Teacher', '', '14/09/2022 11:38:14', '2022-09-14 09:17:39', '2022-09-14 10:38:14'),
(179, 5, 'vivian', 'Uwadia Vivian', '14/09/2022 11:38:14', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-14 10:38:14', '2022-09-14 10:38:14'),
(180, 1, 'Ken220', 'Ken Young', '14/09/2022 11:38:20', 'Logout successfully', 'le12BEQOk7dvuTocaLbf3xYsi48MNW', '0', 'Admin', '', '15/09/2022 13:12:45', '2022-09-14 10:38:20', '2022-09-15 12:12:45'),
(181, 7, 'SS/P/2022', 'Peter Uwadia', '14/09/2022 12:57:59', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-14 11:57:59', '2022-09-14 11:57:59'),
(182, 7, 'SS/P/2022', NULL, '15/09/2022 09:03:34', 'Logout successfully', 'qgL5coFNxwWQrCb6ZBzTjfamGkyKhM', '0', 'Student', '', '15/09/2022 18:01:20', '2022-09-15 08:03:34', '2022-09-15 17:01:20'),
(183, 1, 'Ken220', 'Ken Young', '15/09/2022 11:31:25', 'Logout successfully', 'sent7RC52u9aSGZrTpV0cYAd8FmDIU', '0', 'Admin', '', '15/09/2022 13:12:45', '2022-09-15 10:31:25', '2022-09-15 12:12:45'),
(184, 1, 'Ken220', 'Ken Young', '15/09/2022 13:12:45', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-15 12:12:45', '2022-09-15 12:12:45'),
(185, 5, 'vivian', 'Uwadia Vivian', '15/09/2022 13:12:50', 'Logout successfully', 'AKnPzqd3lvrBwH8ZXyINe1FT6LuY0g', '0', 'Teacher', '', '15/09/2022 13:24:46', '2022-09-15 12:12:50', '2022-09-15 12:24:46'),
(186, 5, 'vivian', 'Uwadia Vivian', '15/09/2022 13:24:46', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-15 12:24:46', '2022-09-15 12:24:46'),
(187, 1, 'Ken220', 'Ken Young', '15/09/2022 13:24:51', 'Logout successfully', 'MW2lr1w6cJq8KDLAdUsIo7BiFa3Skg', '0', 'Admin', '', '17/09/2022 17:27:12', '2022-09-15 12:24:51', '2022-09-17 16:27:12'),
(188, 7, 'SS/P/2022', 'Peter Uwadia', '15/09/2022 18:01:20', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-15 17:01:20', '2022-09-15 17:01:20'),
(189, 7, 'SS/P/2022', NULL, '16/09/2022 09:16:22', 'Logout successfully', 'FU8gLnu3pBAkzxsIW0XecYCGT9NqwQ', '0', 'Student', '', '16/09/2022 09:35:17', '2022-09-16 08:16:22', '2022-09-16 08:35:17'),
(190, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 09:35:17', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 08:35:17', '2022-09-16 08:35:17'),
(191, 7, 'SS/P/2022', NULL, '16/09/2022 09:35:25', 'Logout successfully', 'Z2G9FXI3nYPWKky75U4BbpoqcNDCuQ', '0', 'Student', '', '16/09/2022 09:41:04', '2022-09-16 08:35:25', '2022-09-16 08:41:04'),
(192, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 09:41:04', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 08:41:04', '2022-09-16 08:41:04'),
(193, 7, 'SS/P/2022', NULL, '16/09/2022 09:41:13', 'Logout successfully', 'ejpoWRC5vPFtuXskQwZzU7SK3EDINa', '0', 'Student', '', '16/09/2022 09:44:00', '2022-09-16 08:41:13', '2022-09-16 08:44:00'),
(194, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 09:44:00', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 08:44:00', '2022-09-16 08:44:00'),
(195, 7, 'SS/P/2022', NULL, '16/09/2022 09:44:08', 'Logout successfully', 'hPlTweYBRtmHEv0co46rOajq1iU9sQ', '0', 'Student', '', '16/09/2022 09:44:44', '2022-09-16 08:44:08', '2022-09-16 08:44:44'),
(196, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 09:44:44', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 08:44:44', '2022-09-16 08:44:44'),
(197, 7, 'SS/P/2022', NULL, '16/09/2022 09:44:51', 'Logout successfully', 'hONmRYAJoPCWvZKTae4pB7HFsXG1jd', '0', 'Student', '', '16/09/2022 09:48:47', '2022-09-16 08:44:51', '2022-09-16 08:48:47'),
(198, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 09:48:47', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 08:48:47', '2022-09-16 08:48:47'),
(199, 7, 'SS/P/2022', NULL, '16/09/2022 09:48:51', 'Logout successfully', 'NKaO1AUQxubvmHr8g432sjIqfYDy5w', '0', 'Student', '', '16/09/2022 09:49:14', '2022-09-16 08:48:51', '2022-09-16 08:49:14'),
(200, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 09:49:14', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 08:49:14', '2022-09-16 08:49:14'),
(201, 7, 'SS/P/2022', NULL, '16/09/2022 09:49:21', 'Logout successfully', 'xkiDuIp7STG6YAqczo4gLUK2Vbn5Wv', '0', 'Student', '', '16/09/2022 09:50:26', '2022-09-16 08:49:21', '2022-09-16 08:50:26'),
(202, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 09:50:26', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 08:50:26', '2022-09-16 08:50:26'),
(203, 7, 'SS/P/2022', NULL, '16/09/2022 09:50:33', 'Logout successfully', '4c9fTqpbtNiO0mgG8ylJDL1PK75EBR', '0', 'Student', '', '16/09/2022 10:02:10', '2022-09-16 08:50:33', '2022-09-16 09:02:10'),
(204, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 10:02:10', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 09:02:10', '2022-09-16 09:02:10'),
(205, 7, 'SS/P/2022', NULL, '16/09/2022 10:02:17', 'Logout successfully', 'hlN2aemJ6I9Yf5d1U0bzBVg3Sr7jcL', '0', 'Student', '', '16/09/2022 10:04:36', '2022-09-16 09:02:17', '2022-09-16 09:04:36'),
(206, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 10:04:36', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 09:04:36', '2022-09-16 09:04:36'),
(207, 7, 'SS/P/2022', NULL, '16/09/2022 10:04:43', 'Logout successfully', 'YmFuKacUWZ2yCv3HQprf5Ml9D6oEIz', '0', 'Student', '', '16/09/2022 10:07:53', '2022-09-16 09:04:43', '2022-09-16 09:07:53'),
(208, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 10:07:53', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 09:07:53', '2022-09-16 09:07:53'),
(209, 7, 'SS/P/2022', NULL, '16/09/2022 10:07:59', 'Logout successfully', 'rXcpFeGjq72ad5K8MyVW6wmBkvYDJU', '0', 'Student', '', '16/09/2022 11:30:31', '2022-09-16 09:07:59', '2022-09-16 10:30:31'),
(210, 5, 'vivian', 'Uwadia Vivian', '16/09/2022 11:28:01', 'Logout successfully', '9uAjBUOXYNVaKRqzr6h3sEPbC1i0ck', '0', 'Teacher', '', '16/09/2022 11:39:13', '2022-09-16 10:28:01', '2022-09-16 10:39:13'),
(211, 5, 'vivian', 'Uwadia Vivian', '16/09/2022 11:29:56', 'Logout successfully', 'kuqeYbPd8lTEZAHLRGfiX59z6COKr7', '0', 'Teacher', '', '16/09/2022 11:39:13', '2022-09-16 10:29:56', '2022-09-16 10:39:13'),
(212, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 11:30:31', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 10:30:31', '2022-09-16 10:30:31'),
(213, 5, 'vivian', 'Uwadia Vivian', '16/09/2022 11:30:42', 'Logout successfully', '4El6HOAUsQNPdkGi9fKWXIy3aSrnbx', '0', 'Teacher', '', '16/09/2022 11:39:13', '2022-09-16 10:30:42', '2022-09-16 10:39:13'),
(214, 5, 'vivian', 'Uwadia Vivian', '16/09/2022 11:39:13', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 10:39:13', '2022-09-16 10:39:13'),
(215, 7, 'SS/P/2022', NULL, '16/09/2022 11:39:32', 'Logout successfully', 'ji0ltrCSyhgd6IRWNL4TMqzHcAGEe5', '0', 'Student', '', '16/09/2022 11:41:36', '2022-09-16 10:39:32', '2022-09-16 10:41:36'),
(216, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 11:41:36', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 10:41:36', '2022-09-16 10:41:36'),
(217, 7, 'SS/P/2022', NULL, '16/09/2022 11:57:08', 'Logout successfully', 'KYPcotjZ0FwXVDQmbTAy2aWIvLJxRh', '0', 'Student', '', '16/09/2022 13:20:12', '2022-09-16 10:57:08', '2022-09-16 12:20:12'),
(218, 5, 'vivian', 'Uwadia Vivian', '16/09/2022 12:52:07', 'Logout successfully', 'mk915isel7KctRMVUGnQX3CAzHN4h2', '0', 'Teacher', '', '16/09/2022 15:54:54', '2022-09-16 11:52:07', '2022-09-16 14:54:54'),
(219, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 13:20:12', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 12:20:12', '2022-09-16 12:20:12'),
(220, 5, 'vivian', 'Uwadia Vivian', '16/09/2022 13:20:28', 'Logout successfully', '0oJbUQFgHAd1V3CI7yOZ4YkeiasSWM', '0', 'Teacher', '', '16/09/2022 15:54:54', '2022-09-16 12:20:28', '2022-09-16 14:54:54'),
(221, 5, 'vivian', 'Uwadia Vivian', '16/09/2022 15:54:54', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 14:54:54', '2022-09-16 14:54:54'),
(222, 7, 'SS/P/2022', NULL, '16/09/2022 15:55:07', 'Logout successfully', 'TWxPf6LQubwZAEShX7rptBNeMdzGiV', '0', 'Student', '', '16/09/2022 18:02:37', '2022-09-16 14:55:07', '2022-09-16 17:02:37'),
(223, 5, 'vivian', 'Uwadia Vivian', '16/09/2022 17:57:42', 'Logout successfully', '62QDOHlk3nYmChbovEirWKaXfqGwN7', '0', 'Teacher', '', '16/09/2022 18:01:29', '2022-09-16 16:57:42', '2022-09-16 17:01:29'),
(224, 5, 'vivian', 'Uwadia Vivian', '16/09/2022 18:01:29', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 17:01:29', '2022-09-16 17:01:29'),
(225, 7, 'SS/P/2022', 'Peter Uwadia', '16/09/2022 18:02:37', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-16 17:02:37', '2022-09-16 17:02:37'),
(226, 1, 'Ken220', 'Ken Young', '17/09/2022 11:22:41', 'Logout successfully', '5LrU41adtoObIzGXEciAjqlSZQpvkF', '0', 'Admin', '', '17/09/2022 17:27:12', '2022-09-17 10:22:41', '2022-09-17 16:27:12'),
(227, 1, 'Ken220', 'Ken Young', '17/09/2022 17:27:12', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-17 16:27:12', '2022-09-17 16:27:12'),
(228, 1, 'Ken220', 'Ken Young', '17/09/2022 19:05:29', 'Logout successfully', 'fjZ3Acm7l95J0hkuQdCWXbOIx4NYi2', '0', 'Admin', '', '17/09/2022 19:32:10', '2022-09-17 18:05:29', '2022-09-17 18:32:10'),
(229, 1, 'Ken220', 'Ken Young', '17/09/2022 19:32:10', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-17 18:32:10', '2022-09-17 18:32:10'),
(230, 1, 'Ken220', 'Ken Young', '17/09/2022 19:32:30', 'Logout successfully', 'CBkHjLTZgtNc8s6EPhpvAzfm1nK5YW', '0', 'Admin', '', '17/09/2022 21:21:54', '2022-09-17 18:32:30', '2022-09-17 20:21:54'),
(231, 5, 'vivian', 'Uwadia Vivian', '17/09/2022 20:29:59', 'Logout successfully', 'gRM76Qq1Ud52AahbvZDije3mzprX4O', '0', 'Teacher', '', '17/09/2022 20:36:57', '2022-09-17 19:29:59', '2022-09-17 19:36:57'),
(232, 5, 'vivian', 'Uwadia Vivian', '17/09/2022 20:36:57', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-17 19:36:57', '2022-09-17 19:36:57'),
(233, 7, 'SS/P/2022', NULL, '17/09/2022 20:38:03', 'Logout successfully', 'ry8vpS7xhdoV69T4WgaQB5kMzjXO2e', '0', 'Student', '', '17/09/2022 21:33:02', '2022-09-17 19:38:03', '2022-09-17 20:33:02'),
(234, 1, 'Ken220', 'Ken Young', '17/09/2022 21:21:54', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-17 20:21:54', '2022-09-17 20:21:54'),
(235, 5, 'vivian', 'Uwadia Vivian', '17/09/2022 21:22:00', 'Logout successfully', 'mA9q5VIehGB1kDtEbHuJSLzMow32s4', '0', 'Teacher', '', '17/09/2022 21:32:04', '2022-09-17 20:22:00', '2022-09-17 20:32:04'),
(236, 5, 'vivian', 'Uwadia Vivian', '17/09/2022 21:32:04', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-17 20:32:04', '2022-09-17 20:32:04'),
(237, 1, 'Ken220', 'Ken Young', '17/09/2022 21:32:07', 'Logout successfully', 'jYIGODrU61wFuaCNTtsz3AyH2RM7ol', '0', 'Admin', '', '17/09/2022 21:39:55', '2022-09-17 20:32:07', '2022-09-17 20:39:55'),
(238, 7, 'SS/P/2022', 'Peter Uwadia', '17/09/2022 21:33:02', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-17 20:33:02', '2022-09-17 20:33:02'),
(239, 1, 'Ken220', 'Ken Young', '17/09/2022 21:39:55', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-17 20:39:55', '2022-09-17 20:39:55'),
(240, 1, 'Ken220', 'Ken Young', '18/09/2022 11:16:36', 'Logout successfully', 'RcuNd4foGtvDInKxr39Ubzmk8lAisV', '0', 'Admin', '', '18/09/2022 17:32:11', '2022-09-18 10:16:36', '2022-09-18 16:32:11'),
(241, 5, 'vivian', 'Uwadia Vivian', '18/09/2022 11:17:27', 'Logout successfully', 'DxfA1pK3HUGI8ho54O7WrlFauyi2MY', '0', 'Teacher', '', '18/09/2022 17:32:41', '2022-09-18 10:17:27', '2022-09-18 16:32:41'),
(242, 1, 'Ken220', 'Ken Young', '18/09/2022 17:32:11', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-18 16:32:11', '2022-09-18 16:32:11'),
(243, 5, 'vivian', 'Uwadia Vivian', '18/09/2022 17:32:16', 'Logout successfully', 'q8r2CxalEA9YujKLFJOTDSP6gZhcQU', '0', 'Teacher', '', '18/09/2022 17:32:41', '2022-09-18 16:32:16', '2022-09-18 16:32:41'),
(244, 5, 'vivian', 'Uwadia Vivian', '18/09/2022 17:32:41', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-18 16:32:41', '2022-09-18 16:32:41'),
(245, 5, 'vivian', 'Uwadia Vivian', '18/09/2022 17:36:46', 'Logout successfully', 'IV2mjTi4CLSz7h6PbyEQrtuAgfWXqd', '0', 'Teacher', '', '18/09/2022 17:44:30', '2022-09-18 16:36:46', '2022-09-18 16:44:30'),
(246, 5, 'vivian', 'Uwadia Vivian', '18/09/2022 17:44:30', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-18 16:44:30', '2022-09-18 16:44:30'),
(247, 7, 'SS/P/2022', NULL, '18/09/2022 17:45:17', 'Logout successfully', '6ZlgoK7NpCiTcQzseArwSBH9mGtUYR', '0', 'Student', '', '18/09/2022 17:46:11', '2022-09-18 16:45:17', '2022-09-18 16:46:11'),
(248, 7, 'SS/P/2022', 'Peter Uwadia', '18/09/2022 17:46:11', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-18 16:46:11', '2022-09-18 16:46:11'),
(249, 1, 'Ken220', 'Ken Young', '22/09/2022 17:20:35', 'Logout successfully', 'wi5u4rLqQGFzjHyAUf20kctEv8Y7JC', '0', 'Admin', '', '22/09/2022 17:25:05', '2022-09-22 16:20:35', '2022-09-22 16:25:05'),
(250, 1, 'Ken220', 'Ken Young', '22/09/2022 17:25:05', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-22 16:25:05', '2022-09-22 16:25:05'),
(251, 1, 'Ken220', 'Ken Young', '22/09/2022 17:25:14', 'Logout successfully', 'md8b7TGvCuBospqXAl9J2E1gLci6UR', '0', 'Admin', '', '22/09/2022 17:34:43', '2022-09-22 16:25:14', '2022-09-22 16:34:43'),
(252, 1, 'Ken220', 'Ken Young', '22/09/2022 17:34:43', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-22 16:34:43', '2022-09-22 16:34:43'),
(253, 5, 'vivian', 'Uwadia Vivian', '22/09/2022 17:34:57', 'Logout successfully', 'SjHUeYi12ZN6tB437DVO0LEzMGsWJ8', '0', 'Teacher', '', '22/09/2022 19:47:28', '2022-09-22 16:34:57', '2022-09-22 18:47:28'),
(254, 5, 'vivian', 'Uwadia Vivian', '22/09/2022 17:36:49', 'Logout successfully', 'P0pkw3d86Z5gxRN2e4EVvamYWJthuG', '0', 'Teacher', '', '22/09/2022 19:47:28', '2022-09-22 16:36:49', '2022-09-22 18:47:28'),
(255, 5, 'vivian', 'Uwadia Vivian', '22/09/2022 19:47:28', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-22 18:47:28', '2022-09-22 18:47:28'),
(256, 1, 'Ken220', 'Ken Young', '22/09/2022 19:47:51', 'Logout successfully', 'iXlVmGvbwBxJyQDLaEd1UKRgrOS5eh', '0', 'Admin', '', '22/09/2022 20:01:02', '2022-09-22 18:47:51', '2022-09-22 19:01:02'),
(257, 1, 'Ken220', 'Ken Young', '22/09/2022 20:01:02', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-22 19:01:02', '2022-09-22 19:01:02'),
(258, 1, 'Ken220', 'Ken Young', '22/09/2022 20:01:10', 'Logout successfully', 'gAd9joZpvJW5muDyPBbiO13zs4nrUY', '0', 'Admin', '', '22/09/2022 20:06:24', '2022-09-22 19:01:10', '2022-09-22 19:06:24'),
(259, 1, 'Ken220', 'Ken Young', '22/09/2022 20:06:24', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-22 19:06:24', '2022-09-22 19:06:24'),
(260, 1, 'Ken220', 'Ken Young', '23/09/2022 13:52:48', 'Logout successfully', 't9fOP8QvcYxMHVIF0SNa1WmADbkrsn', '0', 'Admin', '', '23/09/2022 14:15:36', '2022-09-23 12:52:48', '2022-09-23 13:15:36'),
(261, 5, 'vivian', 'Uwadia Vivian', '23/09/2022 14:15:15', 'Logout successfully', 'e4dvEU0uqBybcjSA71tIrlCZpFRLGx', '0', 'Teacher', '', '23/09/2022 14:17:56', '2022-09-23 13:15:15', '2022-09-23 13:17:56'),
(262, 1, 'Ken220', 'Ken Young', '23/09/2022 14:15:36', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-23 13:15:36', '2022-09-23 13:15:36'),
(263, 5, 'vivian', 'Uwadia Vivian', '23/09/2022 14:15:46', 'Logout successfully', 'yZoL9DKXrewVC3Sngvb0Q7jIiFPBJM', '0', 'Teacher', '', '23/09/2022 14:17:56', '2022-09-23 13:15:46', '2022-09-23 13:17:56'),
(264, 5, 'vivian', 'Uwadia Vivian', '23/09/2022 14:17:56', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-23 13:17:56', '2022-09-23 13:17:56'),
(265, 5, 'vivian', 'Uwadia Vivian', '23/09/2022 14:19:04', 'Logout successfully', 'cykdn5bHhAuow0p7i3Fz6rLlSP2Nxj', '0', 'Teacher', '', '23/09/2022 14:19:14', '2022-09-23 13:19:04', '2022-09-23 13:19:14'),
(266, 5, 'vivian', 'Uwadia Vivian', '23/09/2022 14:19:14', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-23 13:19:14', '2022-09-23 13:19:14'),
(267, 1, 'Ken220', 'Ken Young', '23/09/2022 14:19:27', 'Logout successfully', 'FHN9vMi2tcE7Vkdry1eSaT0zhjYJQ8', '0', 'Admin', '', '23/09/2022 21:01:47', '2022-09-23 13:19:27', '2022-09-23 20:01:47'),
(268, 5, 'vivian', 'Uwadia Vivian', '23/09/2022 14:19:49', 'Logout successfully', 'RMAHbG0uN4V1scLt79f2zrQEylYneU', '0', 'Teacher', '', '24/09/2022 12:22:04', '2022-09-23 13:19:49', '2022-09-24 11:22:04');
INSERT INTO `login_statuses` (`id`, `user_id`, `user_name`, `login_name`, `login_date`, `login_nature`, `login_uid`, `login_status`, `login_role`, `logg_action`, `logout_date`, `created_at`, `updated_at`) VALUES
(269, 1, 'Ken220', 'Ken Young', '23/09/2022 17:28:27', 'Logout successfully', 'ejvoCht3DLORIHgcqdubNprZFslW4A', '0', 'Admin', '', '23/09/2022 21:01:47', '2022-09-23 16:28:27', '2022-09-23 20:01:47'),
(270, 1, 'Ken220', 'Ken Young', '23/09/2022 21:01:47', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-23 20:01:47', '2022-09-23 20:01:47'),
(271, 1, 'Ken220', 'Ken Young', '24/09/2022 08:52:06', 'Logout successfully', 'zEGVrNQ1FHfJnCvI2xo9OAX8kspRY7', '0', 'Admin', '', '24/09/2022 09:22:46', '2022-09-24 07:52:06', '2022-09-24 08:22:46'),
(272, 1, 'Ken220', 'Ken Young', '24/09/2022 09:22:46', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 08:22:46', '2022-09-24 08:22:46'),
(273, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 09:22:52', 'Logout successfully', 'fSZlOzoKiPCqhBLQgRnGcVukwUWFD5', '0', 'Teacher', '', '24/09/2022 12:22:04', '2022-09-24 08:22:52', '2022-09-24 11:22:04'),
(274, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 12:22:04', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 11:22:04', '2022-09-24 11:22:04'),
(275, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 12:22:15', 'Logout successfully', 'erJzF7m2oBWfA1gMH0YTqwtnODGUv4', '0', 'Teacher', '', '24/09/2022 14:02:50', '2022-09-24 11:22:15', '2022-09-24 13:02:50'),
(276, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:02:50', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 13:02:50', '2022-09-24 13:02:50'),
(277, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:06:00', 'Logout successfully', 'JsFdGzNxRfyOQt0Al9ejg75cHvVmB6', '0', 'Teacher', '', '24/09/2022 14:07:45', '2022-09-24 13:06:00', '2022-09-24 13:07:45'),
(278, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:07:45', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 13:07:45', '2022-09-24 13:07:45'),
(279, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:07:52', 'Logout successfully', 'qW4NAIrKxcj0LkMQZPVJGwB8Ru2Hlf', '0', 'Teacher', '', '24/09/2022 14:12:03', '2022-09-24 13:07:52', '2022-09-24 13:12:03'),
(280, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:12:03', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 13:12:03', '2022-09-24 13:12:03'),
(281, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:12:22', 'Logout successfully', 'Ds1fhiIUSrVv2JkuGoPWL6dtynF5MZ', '0', 'Teacher', '', '24/09/2022 14:15:34', '2022-09-24 13:12:22', '2022-09-24 13:15:34'),
(282, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:15:34', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 13:15:34', '2022-09-24 13:15:34'),
(283, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:15:43', 'Logout successfully', 'ZyuKUQm4kd8YajBOWxFGXHNeTrzq1l', '0', 'Teacher', '', '24/09/2022 14:40:49', '2022-09-24 13:15:43', '2022-09-24 13:40:49'),
(284, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:40:49', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 13:40:49', '2022-09-24 13:40:49'),
(285, 1, 'Ken220', 'Ken Young', '24/09/2022 14:40:59', 'Logout successfully', 'TrGE27xSZ8XBmwRKbJcfysgoWzMUFl', '0', 'Admin', '', '24/09/2022 14:41:13', '2022-09-24 13:40:59', '2022-09-24 13:41:13'),
(286, 1, 'Ken220', 'Ken Young', '24/09/2022 14:41:13', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 13:41:13', '2022-09-24 13:41:13'),
(287, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:41:24', 'Logout successfully', 'J2XZKqGrz9Um6by15AYCs8PEduHcnB', '0', 'Teacher', '', '24/09/2022 14:42:55', '2022-09-24 13:41:24', '2022-09-24 13:42:55'),
(288, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:42:55', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 13:42:55', '2022-09-24 13:42:55'),
(289, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:43:04', 'Logout successfully', 'tiWUc0dGHnfYmRKCkD2qX6vZ3gFA8J', '0', 'Teacher', '', '24/09/2022 14:51:08', '2022-09-24 13:43:04', '2022-09-24 13:51:08'),
(290, 5, 'vivian', 'Uwadia Vivian', '24/09/2022 14:51:08', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 13:51:08', '2022-09-24 13:51:08'),
(291, 1, 'Ken220', 'Ken Young', '24/09/2022 14:52:48', 'Logout successfully', 'rKouCSQNjqfPEbRFDHpxm5nBcza7MG', '0', 'Admin', '', '24/09/2022 14:53:03', '2022-09-24 13:52:48', '2022-09-24 13:53:03'),
(292, 1, 'Ken220', 'Ken Young', '24/09/2022 14:53:03', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 13:53:03', '2022-09-24 13:53:03'),
(293, 7, 'SS/P/2022', NULL, '24/09/2022 14:54:44', 'Logout successfully', 'JIerDFZ92uy8UR3z6vSQMGCacj1TWB', '0', 'Student', '', '24/09/2022 15:12:54', '2022-09-24 13:54:44', '2022-09-24 14:12:54'),
(294, 7, 'SS/P/2022', NULL, '24/09/2022 14:57:12', 'Logout successfully', 'DJnqhgYa3EMviB0IdTpNSwb8j4GO16', '0', 'Student', '', '24/09/2022 15:12:54', '2022-09-24 13:57:12', '2022-09-24 14:12:54'),
(295, 7, 'SS/P/2022', 'Peter Uwadia', '24/09/2022 15:12:54', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 14:12:54', '2022-09-24 14:12:54'),
(296, 7, 'SS/P/2022', NULL, '24/09/2022 15:12:59', 'Logout successfully', '7PkpXvWMNhBuEi253mFqY1JecTsdxD', '0', 'Student', '', '24/09/2022 15:26:29', '2022-09-24 14:12:59', '2022-09-24 14:26:29'),
(297, 7, 'SS/P/2022', 'Peter Uwadia', '24/09/2022 15:26:29', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 14:26:29', '2022-09-24 14:26:29'),
(298, 7, 'SS/P/2022', NULL, '24/09/2022 18:53:52', 'Logout successfully', '3QX70n4otSNLYxwCgrDucyZhbeOMWU', '0', 'Student', '', '24/09/2022 18:55:17', '2022-09-24 17:53:52', '2022-09-24 17:55:17'),
(299, 7, 'SS/P/2022', 'Peter Uwadia', '24/09/2022 18:55:17', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 17:55:17', '2022-09-24 17:55:17'),
(300, 7, 'SS/P/2022', NULL, '24/09/2022 18:56:57', 'Logout successfully', 'hJt6RQIGUYOeoEZbCdslAzKPX9uF5q', '0', 'Student', '', '24/09/2022 19:28:24', '2022-09-24 17:56:57', '2022-09-24 18:28:24'),
(301, 7, 'SS/P/2022', 'Peter Uwadia', '24/09/2022 19:28:24', 'User Logged out Successfully', NULL, '0', NULL, NULL, NULL, '2022-09-24 18:28:24', '2022-09-24 18:28:24'),
(302, 1, 'Ken220', 'Ken Young', '24/09/2022 19:37:59', 'User Logged in Successfully', 'Ju0cpeiXVn3Rg1hLB8YSH7vFytAQr9', '1', 'Admin', 'Authenticated', NULL, '2022-09-24 18:37:59', '2022-09-24 18:37:59');

-- --------------------------------------------------------

--
-- Table structure for table `message_systems`
--

CREATE TABLE `message_systems` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `receiver_user_id` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sender_user_id` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_nature` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_body` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_sender_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_receiver_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_file` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_delete_uid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_receiver_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_send_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_delete_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mes_tid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `message_systems`
--

INSERT INTO `message_systems` (`id`, `receiver_user_id`, `sender_user_id`, `mes_nature`, `mes_title`, `mes_body`, `mes_sender_name`, `mes_receiver_email`, `mes_file`, `mes_status`, `mes_delete_uid`, `mes_receiver_status`, `mes_send_date`, `mes_delete_date`, `mes_action`, `mes_tid`, `created_at`, `updated_at`) VALUES
(1, '5', '1', NULL, 'Welcome Back', NULL, NULL, NULL, NULL, 'Active', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, '5', '2', NULL, NULL, NULL, NULL, NULL, NULL, 'Deleted', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '', '5', 'Notification', 'testing', 'avjsdbkwhdviwhvw', 'Uwadia Vivian', ' ', NULL, 'Failed', NULL, 'New', '10/09/2022 17:43:02', NULL, NULL, 'f7Pjvqb9gtlKTs2B', '2022-09-10 16:43:02', '2022-09-10 16:43:02'),
(4, '1', '5', 'Message', 'Testing', 'This is my message here', 'Uwadia Vivian', 'ken@gmail.com', NULL, 'Active', NULL, 'New', '10/09/2022 17:50:46', NULL, NULL, 'r1AyiTbe9kh5MqoD', '2022-09-10 16:50:46', '2022-09-10 16:50:46'),
(5, '5', '5', 'Message', 'How was the job?', 'I want to notified you that, this project is almost done and we at the 95% done in the project.\n\nI hope to present the project next week for your view.\n\nThank you.\n\nBest regards.\n\nKen.', 'Uwadia Vivian', 'vivian@gmail.com', NULL, 'Read', NULL, 'New', '11/09/2022 14:22:05', NULL, NULL, 'ZkpEfL8UsDieVuAI', '2022-09-11 13:22:05', '2022-09-13 13:19:57'),
(6, '5', '7', 'Message', 'Assignment Notification', 'Peter Uwadia, Submitted assignment which you need to review and rate base on the performance.', 'Peter Uwadia', 'vivian@gmail.com', NULL, 'Read', NULL, 'New', '13/09/2022 17:53:52', NULL, NULL, 'fvNX4wZ09q36SYum', '2022-09-13 16:53:52', '2022-09-14 06:52:22'),
(7, '5', '5', 'Assignment Remark', 'Assignment Remark', 'Thank you for the assignment! Very good', 'Uwadia Vivian', 'uwas@gmail.com', NULL, 'Active', NULL, 'New', '14/09/2022 09:29:30', NULL, NULL, '4XL2DUSGf90qubrJ', '2022-09-14 08:29:30', '2022-09-14 08:29:30'),
(8, '5', '5', 'Assignment Remark', 'Assignment Remark', 'Sorry, you need to re-write this assignment again thank you', 'Uwadia Vivian', 'uwas@gmail.com', NULL, 'Active', NULL, 'New', '14/09/2022 09:31:47', NULL, NULL, 'IjJkuX2ZNdYDVB7b', '2022-09-14 08:31:47', '2022-09-14 08:31:47'),
(9, '5', '5', 'Assignment Remark', 'Assignment Remark', 'Sorry', 'Uwadia Vivian', 'uwas@gmail.com', NULL, 'Active', NULL, 'New', '14/09/2022 09:32:51', NULL, NULL, 'fOgrA20pqFc86vD4', '2022-09-14 08:32:51', '2022-09-14 08:32:51'),
(10, '5', '7', 'Message', 'Assignment Notification', 'Peter Uwadia, Submitted assignment which you need to review and rate base on the performance.', 'Peter Uwadia', 'vivian@gmail.com', NULL, 'Read', NULL, 'New', '14/09/2022 10:17:16', NULL, NULL, '3xVtwhzDv5pfaoQH', '2022-09-14 09:17:16', '2022-09-22 18:46:43');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2022_07_29_120551_create_class_models_table', 2),
(6, '2022_07_29_124221_create_activitity_logs_table', 3),
(7, '2022_07_29_161714_create_subjects_table', 4),
(8, '2022_07_30_140218_create_academic_sessions_table', 5),
(9, '2022_07_30_154750_create_term_models_table', 6),
(10, '2022_07_31_120534_create_school_categories_table', 7),
(11, '2022_07_31_135655_create_school_resumptions_table', 8),
(12, '2022_07_31_162331_create_days_school_opens_table', 9),
(13, '2022_07_31_180427_create_current_sessions_table', 10),
(14, '2022_08_02_181829_create_students_table', 11),
(15, '2022_08_04_095355_create_staff_table', 12),
(16, '2022_08_04_155620_create_admin_users_table', 13),
(17, '2022_08_05_081044_create_result_tables_table', 14),
(18, '2022_08_05_095618_create_result_process_starts_table', 15),
(19, '2022_08_05_145006_create_result_saves_table', 16),
(20, '2022_08_07_121815_create_test_records_table', 17),
(21, '2022_08_11_124532_create_result_c_a_s_table', 18),
(22, '2022_08_11_125918_create_c_a_result_process_starts_table', 18),
(23, '2022_08_12_110307_create_result_view_checks_table', 19),
(24, '2022_08_14_152149_create_student_positions_table', 20),
(25, '2022_08_16_144623_create_process_gradings_table', 21),
(26, '2022_08_21_204542_create_test_saves_table', 22),
(27, '2022_08_23_130130_create_start_promotions_table', 23),
(28, '2022_08_24_181013_create_graduations_table', 24),
(29, '2022_08_24_181451_create_start_graduations_table', 24),
(30, '2022_08_25_103316_create_attendances_table', 25),
(31, '2022_08_25_104236_create_start_attendances_table', 25),
(32, '2022_08_26_112947_create_generate_pins_table', 26),
(33, '2022_08_27_090759_create_assigned_subjects_table', 27),
(34, '2022_08_27_181925_create_assign_classes_table', 28),
(35, '2022_08_28_114545_create_psychomoto_domians_table', 29),
(36, '2022_08_28_120032_create_start_psychomoto_domains_table', 29),
(38, '2022_09_01_114535_create_finance_reports_table', 30),
(39, '2022_09_01_163526_create_student_comments_table', 31),
(40, '2022_09_05_145233_create_login_statuses_table', 32),
(41, '2022_09_08_102208_create_application_notifications_table', 33),
(42, '2022_09_08_104644_create_assignments_table', 34),
(43, '2022_09_08_112604_create_message_systems_table', 35),
(44, '2022_09_13_154452_create_submit_assignments_table', 36),
(45, '2022_09_17_133246_create_system_setups_table', 37);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(405, 'App\\Models\\User', 1, 'ken@gmail.com_AdminToken', '5a84d33398a7421ff88eaea7e6bb1f749974716472d4fecb8b4a7f9bcf75aa1d', '[\"server:admin\"]', '2022-09-24 18:38:07', '2022-09-24 18:37:57', '2022-09-24 18:38:07');

-- --------------------------------------------------------

--
-- Table structure for table `process_gradings`
--

CREATE TABLE `process_gradings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `stu_admin_no` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_ca` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_exam` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_score` bigint(20) DEFAULT 0,
  `g_position` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `process_gradings`
--

INSERT INTO `process_gradings` (`id`, `stu_admin_no`, `stu_name`, `g_class`, `g_term`, `g_year`, `g_category`, `total_ca`, `g_exam`, `g_code`, `total_score`, `g_position`, `g_addby`, `g_date`, `g_status`, `created_at`, `updated_at`) VALUES
(153, 'CS/30303', 'fdfvsvs', '6', '7', '6', '1', '28', '44', 'c8KYqBxZdy9ruRPe', 72, NULL, 'Ken220', '21/08/2022 16:56:15', 'Active', NULL, NULL),
(154, 'wewewe333', 'regerg', '6', '7', '6', '1', '4', '38', 'c8KYqBxZdy9ruRPe', 72, NULL, 'Ken220', '21/08/2022 16:56:15', 'Active', NULL, NULL),
(155, 'ICC/90998/10', 'Daniel Joe', '6', '7', '6', '1', '27', '38', 'c8KYqBxZdy9ruRPe', 65, NULL, NULL, '21/08/2022 16:56:15', 'Active', NULL, NULL),
(156, 'ICC/90998/09', 'Ken Developer', '6', '7', '6', '1', '4', '45', 'c8KYqBxZdy9ruRPe', 49, NULL, 'Ken220', '21/08/2022 16:56:15', 'Active', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `psychomoto_domians`
--

CREATE TABLE `psychomoto_domians` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `effectiveness` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `neatness_score` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `craft_score` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `punctuality_score` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sport_score` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aff_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aff_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aff_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aff_admin_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aff_student_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aff_addedby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aff_tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aff_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aff_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `psychomoto_domians`
--

INSERT INTO `psychomoto_domians` (`id`, `effectiveness`, `neatness_score`, `craft_score`, `punctuality_score`, `sport_score`, `aff_year`, `aff_term`, `aff_class`, `aff_admin_number`, `aff_student_name`, `aff_addedby`, `aff_tid`, `aff_date`, `aff_status`, `created_at`, `updated_at`) VALUES
(10, '11', '3', '5', '19', '20', '5', '7', '6', 'CS/30303', 'gbfgbgb fdfvsvs', 'Ken220', 'v6E1ZNoC75dfnBJM', '28/08/2022 15:15:29', 'Deleted', '2022-08-28 14:15:29', '2022-08-28 15:48:15'),
(11, '2', '8', '6', '19', '14', '5', '7', '6', 'ICC/90998/09', 'Uwadia Ken Developer', 'Ken220', 'v6E1ZNoC75dfnBJM', '28/08/2022 15:15:29', 'Deleted', '2022-08-28 14:15:29', '2022-08-28 14:53:44'),
(12, '37', '67', '44', '34', '32', '5', '7', '6', 'wewewe333', 'rgerg regerg', 'Ken220', 'v6E1ZNoC75dfnBJM', '28/08/2022 15:15:29', 'Deleted', '2022-08-28 14:15:29', '2022-08-28 15:48:44'),
(13, '12', '53', '22', '34', '56', '6', '8', '6', 'CS/30303', 'gbfgbgb fdfvsvs', 'Ken220', 'n8xIK0HtLy3PhfeE', '28/08/2022 16:51:52', 'Deleted', '2022-08-28 15:51:52', '2022-08-28 15:51:52'),
(14, '4', '54', '12', '5', '6', '6', '8', '6', 'ICC/90998/09', 'Uwadia Ken Developer', 'Ken220', 'n8xIK0HtLy3PhfeE', '28/08/2022 16:51:52', 'Deleted', '2022-08-28 15:51:52', '2022-08-28 15:51:52'),
(15, '5', '56', '34', '56', '7', '6', '8', '6', 'wewewe333', 'rgerg regerg', 'Ken220', 'n8xIK0HtLy3PhfeE', '28/08/2022 16:51:52', 'Deleted', '2022-08-28 15:51:52', '2022-08-28 15:51:52'),
(16, '4', '4', '4', '4', '4', '6', '7', '6', 'CS/30303', 'gbfgbgb fdfvsvs', 'Ken220', 'NUfEVDI62FMBqZdJ', '29/08/2022 19:09:41', 'Deleted', '2022-08-29 18:09:41', '2022-08-29 18:09:41'),
(17, '4', '4', '4', '4', '4', '6', '7', '6', 'ICC/90998/09', 'Uwadia Ken Developer', 'Ken220', 'NUfEVDI62FMBqZdJ', '29/08/2022 19:09:41', 'Deleted', '2022-08-29 18:09:41', '2022-08-29 18:09:41'),
(18, '4', '4', '4', '4', '4', '6', '7', '6', 'wewewe333', 'rgerg regerg', 'Ken220', 'NUfEVDI62FMBqZdJ', '29/08/2022 19:09:41', 'Deleted', '2022-08-29 18:09:41', '2022-08-29 18:09:41'),
(22, '3', '3', '3', '3', '3', '6', '7', '6', 'CS/30303', 'gbfgbgb fdfvsvs', 'vivian', 'x8AzrCmgpKfYwEce', '10/09/2022 11:04:34', 'Active', '2022-09-10 10:04:34', '2022-09-10 10:04:34'),
(23, '3', '3', '3', '3', '3', '6', '7', '6', 'ICC/90998/09', 'Uwadia Ken Developer', 'vivian', 'x8AzrCmgpKfYwEce', '10/09/2022 11:04:34', 'Active', '2022-09-10 10:04:34', '2022-09-10 10:04:34'),
(24, '3', '3', '3', '3', '3', '6', '7', '6', 'wewewe333', 'rgerg regerg', 'vivian', 'x8AzrCmgpKfYwEce', '10/09/2022 11:04:34', 'Active', '2022-09-10 10:04:34', '2022-09-10 10:04:34'),
(25, '4', '7', '4', '7', '7', '5', '7', '6', 'CS/30303', 'gbfgbgb fdfvsvs', 'vivian', 'x1WsnVOB9CoeKFhi', '10/09/2022 11:29:45', 'Active', '2022-09-10 10:29:45', '2022-09-10 10:29:45'),
(26, '5', '7', '6', '7', '7', '5', '7', '6', 'ICC/90998/09', 'Uwadia Ken Developer', 'vivian', 'x1WsnVOB9CoeKFhi', '10/09/2022 11:29:45', 'Active', '2022-09-10 10:29:45', '2022-09-10 10:29:45'),
(27, '12', '10', '17', '11', '12', '5', '7', '6', 'SS/P/20220', 'rgerg regerg', 'vivian', 'x1WsnVOB9CoeKFhi', '10/09/2022 11:29:45', 'Active', '2022-09-10 10:29:45', '2022-09-10 10:31:20');

-- --------------------------------------------------------

--
-- Table structure for table `result_c_a_s`
--

CREATE TABLE `result_c_a_s` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `st_admin_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `st_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ca1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ca2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hrs_work` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hrs_earned` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ca_total` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rst_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rst_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rst_subject` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rst_category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rst_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rst_tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rst_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rst_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rst_addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `result_c_a_s`
--

INSERT INTO `result_c_a_s` (`id`, `st_admin_id`, `st_name`, `ca1`, `ca2`, `hrs_work`, `hrs_earned`, `ca_total`, `rst_year`, `rst_term`, `rst_subject`, `rst_category`, `rst_class`, `rst_tid`, `rst_date`, `rst_status`, `rst_addby`, `created_at`, `updated_at`) VALUES
(1, 'CS/30303', NULL, '2', '2', NULL, NULL, '4', '6', '8', '1', '1', '6', 'yebr98LK0jFDCqaY', '11/08/2022 15:04:25', 'Deleted', 'Ken220', '2022-08-11 14:04:25', '2022-08-11 14:30:23'),
(2, 'CS/30303', NULL, '2', '2', NULL, NULL, '4', '6', '8', '1', '1', '6', 'yebr98LK0jFDCqaY', '11/08/2022 15:06:05', 'Deleted', 'Ken220', '2022-08-11 14:06:05', '2022-08-11 14:30:23'),
(3, 'ICC/90998/09', NULL, '2', '2', NULL, NULL, '4', '6', '8', '1', '1', '6', 'yebr98LK0jFDCqaY', '11/08/2022 15:06:05', 'Deleted', 'Ken220', '2022-08-11 14:06:05', '2022-08-11 14:30:23'),
(4, 'wewewe333', NULL, '2', '2', NULL, NULL, '4', '6', '8', '1', '1', '6', 'yebr98LK0jFDCqaY', '11/08/2022 15:06:05', 'Deleted', 'Ken220', '2022-08-11 14:06:05', '2022-08-11 14:30:23'),
(5, 'CS/30303', NULL, '2', '2', NULL, NULL, '4', '5', '7', '1', '1', '6', 'M2EN50ik93mgK7XO', '11/08/2022 15:33:33', 'Deleted', 'Ken220', '2022-08-11 14:33:33', '2022-09-03 09:53:15'),
(6, 'ICC/90998/09', NULL, '2', '2', NULL, NULL, '4', '5', '7', '1', '1', '6', 'M2EN50ik93mgK7XO', '11/08/2022 15:33:33', 'Deleted', 'Ken220', '2022-08-11 14:33:33', '2022-09-03 09:53:15'),
(7, 'wewewe333', NULL, '2', '2', NULL, NULL, '4', '5', '7', '1', '1', '6', 'M2EN50ik93mgK7XO', '11/08/2022 15:33:33', 'Deleted', 'Ken220', '2022-08-11 14:33:33', '2022-09-03 09:53:15'),
(8, 'CS/30303', NULL, '12', '15', NULL, NULL, '27', '6', '7', '3', '2', '6', 'LOdCZliBwIMspFWU', '11/08/2022 15:50:36', 'Active', 'Ken220', '2022-08-11 14:50:36', '2022-08-11 14:50:36'),
(9, 'ICC/90998/09', NULL, '13', '16', NULL, NULL, '29', '6', '7', '3', '2', '6', 'LOdCZliBwIMspFWU', '11/08/2022 15:50:36', 'Active', 'Ken220', '2022-08-11 14:50:36', '2022-08-11 14:50:36'),
(10, 'wewewe333', NULL, '14', '17', NULL, NULL, '31', '6', '7', '3', '2', '6', 'LOdCZliBwIMspFWU', '11/08/2022 15:50:36', 'Active', 'Ken220', '2022-08-11 14:50:36', '2022-08-11 14:50:36'),
(11, 'CS/30303', NULL, '14', '16', NULL, NULL, '30', '6', '8', '7', '1', '6', '19StFUOw8Gz4ndjJ', '11/08/2022 15:55:25', 'Deleted', 'Ken220', '2022-08-11 14:55:25', '2022-08-16 10:54:06'),
(12, 'ICC/90998/09', NULL, '17', '11', NULL, NULL, '28', '6', '8', '7', '1', '6', '19StFUOw8Gz4ndjJ', '11/08/2022 15:55:25', 'Deleted', 'Ken220', '2022-08-11 14:55:25', '2022-08-16 10:54:06'),
(13, 'wewewe333', NULL, '18', '19', NULL, NULL, '37', '6', '8', '7', '1', '6', '19StFUOw8Gz4ndjJ', '11/08/2022 15:55:25', 'Deleted', 'Ken220', '2022-08-11 14:55:25', '2022-08-16 10:54:06'),
(17, 'CS/30303', 'fdfvsvs', '11', '11', NULL, NULL, '22', '7', '7', '1', '1', '6', 'ERmTCtGnNzHrUkgu', '12/08/2022 09:01:11', 'Active', 'Ken220', '2022-08-12 08:01:11', '2022-08-12 08:01:11'),
(18, 'ICC/90998/09', 'Ken Developer', '11', '11', NULL, NULL, '22', '7', '7', '1', '1', '6', 'ERmTCtGnNzHrUkgu', '12/08/2022 09:01:11', 'Active', 'Ken220', '2022-08-12 08:01:11', '2022-08-12 08:01:11'),
(19, 'wewewe333', 'regerg', '11', '11', NULL, NULL, '22', '7', '7', '1', '1', '6', 'ERmTCtGnNzHrUkgu', '12/08/2022 09:01:11', 'Active', 'Ken220', '2022-08-12 08:01:11', '2022-08-12 08:01:11'),
(20, 'wewewe333', NULL, '2', '20', NULL, NULL, '22', '6', '7', '3', '1', '6', '4lJZrWIfUi19svtQ', '13/08/2022 17:34:03', 'Deleted', 'Ken220', '2022-08-13 16:34:03', '2022-08-16 10:54:50'),
(21, 'wewewe333', NULL, '2', '20', NULL, NULL, '22', '6', '7', '3', '1', '6', 'IK8pS60RLX51f2sZ', '13/08/2022 17:35:33', 'Active', 'Ken220', '2022-08-13 16:35:33', '2022-08-13 16:35:33'),
(22, 'wewewe333', 'regerg', '2', '20', NULL, NULL, '22', '6', '7', '3', '1', '6', '6bFz42jwEhCGkp5B', '13/08/2022 17:36:28', 'Deleted', 'Ken220', '2022-08-13 16:36:28', '2022-08-13 16:37:32'),
(23, 'wewewe333', NULL, '12', '3', NULL, NULL, '15', '7', '7', '5', '2', '6', 'VkIZGYQCUzo8nLR2', '13/08/2022 17:38:15', 'Active', 'Ken220', '2022-08-13 16:38:15', '2022-08-13 16:38:15'),
(24, 'ICC/90998/09', NULL, '15', '18', NULL, NULL, '33', '7', '7', '5', '2', '6', 'VkIZGYQCUzo8nLR2', '13/08/2022 17:38:15', 'Active', 'Ken220', '2022-08-13 16:38:15', '2022-08-13 16:38:15'),
(25, 'CS/30303', 'fdfvsvs', '15', '13', NULL, NULL, '28', '7', '7', '5', '2', '6', 'VkIZGYQCUzo8nLR2', '13/08/2022 17:38:15', 'Active', 'Ken220', '2022-08-13 16:38:15', '2022-08-13 16:38:15'),
(26, 'wewewe333', NULL, '3', '4', NULL, NULL, '7', '6', '8', '6', '1', '6', 'yNI6tBidA1H7sJEW', '13/08/2022 17:40:05', 'Active', 'Ken220', '2022-08-13 16:40:05', '2022-08-13 16:40:05'),
(27, 'ICC/90998/09', NULL, '4', '2', NULL, NULL, '6', '6', '8', '6', '1', '6', 'yNI6tBidA1H7sJEW', '13/08/2022 17:40:05', 'Active', 'Ken220', '2022-08-13 16:40:05', '2022-08-13 16:40:05'),
(28, 'CS/30303', 'fdfvsvs', '5', '6', NULL, NULL, '11', '6', '8', '6', '1', '6', 'yNI6tBidA1H7sJEW', '13/08/2022 17:40:05', 'Active', 'Ken220', '2022-08-13 16:40:05', '2022-08-13 16:40:05'),
(46, 'CS/30303', 'fdfvsvs', '11', '14', NULL, NULL, '25', '5', '7', '6', '1', '6', 'UMsxJe8A3cZOEauH', '19/08/2022 11:43:29', 'Deleted', 'Ken220', '2022-08-19 10:43:29', '2022-09-22 19:04:58'),
(47, 'SS/P/2022', 'Ken Developer', '12', '15', NULL, NULL, '27', '5', '7', '6', '1', '6', 'UMsxJe8A3cZOEauH', '19/08/2022 11:43:29', 'Deleted', 'Ken220', '2022-08-19 10:43:29', '2022-09-22 19:04:58'),
(48, 'SS/P/2022', 'regerg', '13', '16', NULL, NULL, '29', '5', '7', '6', '1', '6', 'UMsxJe8A3cZOEauH', '19/08/2022 11:43:29', 'Deleted', 'Ken220', '2022-08-19 10:43:29', '2022-09-22 19:04:58'),
(49, 'SS/P/2022', 'fdfvsvs', '10', '20', NULL, NULL, '30', '5', '7', '3', '1', '6', 'ltMRSAyzGsCQfTei', '19/08/2022 13:43:30', 'Active', 'Ken220', '2022-08-19 12:43:30', '2022-08-19 12:43:30'),
(50, 'SS/P/2022', 'Ken Developer', '8', '10', NULL, NULL, '18', '5', '7', '3', '1', '6', 'ltMRSAyzGsCQfTei', '19/08/2022 13:43:30', 'Active', 'Ken220', '2022-08-19 12:43:30', '2022-08-19 12:43:30'),
(51, 'SS/P/2022', 'regerg', '9', '15', NULL, NULL, '24', '5', '7', '3', '1', '6', 'ltMRSAyzGsCQfTei', '19/08/2022 13:43:30', 'Active', 'Ken220', '2022-08-19 12:43:30', '2022-08-19 12:43:30'),
(52, 'wewewe333', 'regerg', '14', '11', NULL, NULL, '25', '7', '8', '7', '1', '6', 'SUgQdnHkJpEehPMC', '19/08/2022 14:08:26', 'Active', 'Ken220', '2022-08-19 13:08:26', '2022-08-19 13:08:26'),
(53, 'ICC/90998/09', 'Ken Developer', '13', '17', NULL, NULL, '30', '7', '8', '7', '1', '6', 'SUgQdnHkJpEehPMC', '19/08/2022 14:08:26', 'Active', 'Ken220', '2022-08-19 13:08:26', '2022-08-19 13:08:26'),
(54, 'CS/30303', 'fdfvsvs', '11', '18', NULL, NULL, '29', '7', '8', '7', '1', '6', 'SUgQdnHkJpEehPMC', '19/08/2022 14:08:26', 'Active', 'Ken220', '2022-08-19 13:08:26', '2022-08-19 13:08:26'),
(107, 'CS/30303', 'fdfvsvs', '20', '19', NULL, NULL, '39', '6', '7', '14', '1', '6', '2AJSjxoaeRQknX34', '01/09/2022 16:25:46', 'Active', 'Ken220', '2022-09-01 15:25:46', '2022-09-03 11:25:34'),
(108, 'ICC/90998/09', 'Ken Developer', '12', '11', NULL, NULL, '23', '6', '7', '14', '1', '6', '2AJSjxoaeRQknX34', '01/09/2022 16:25:46', 'Active', 'Ken220', '2022-09-01 15:25:46', '2022-09-03 10:58:04'),
(109, 'wewewe333', 'regerg', '71', '151', NULL, NULL, '221', '6', '7', '14', '1', '6', '2AJSjxoaeRQknX34', '01/09/2022 16:25:46', 'Active', 'Ken220', '2022-09-01 15:25:46', '2022-09-03 11:13:07'),
(120, 'SS/P/2022', 'fdfvsvs', '2', '4', NULL, NULL, '6', '5', '7', '8', NULL, '6', 'NeBF9WLZKESDbJYj', '09/09/2022 12:25:28', 'Active', 'vivian', '2022-09-09 11:25:28', '2022-09-09 11:25:28'),
(121, 'SS/P/2022', 'Ken Developer', '2', '6', NULL, NULL, '8', '5', '7', '8', NULL, '6', 'NeBF9WLZKESDbJYj', '09/09/2022 12:25:28', 'Active', 'vivian', '2022-09-09 11:25:28', '2022-09-09 11:25:28'),
(122, 'SS/P/2022', 'regerg', '2', '12', NULL, NULL, '14', '5', '7', '8', NULL, '6', 'NeBF9WLZKESDbJYj', '09/09/2022 12:25:28', 'Active', 'vivian', '2022-09-09 11:25:28', '2022-09-09 11:25:28'),
(123, 'wewewe333', 'regerg', '12', '14', NULL, NULL, '26', '6', '7', '6', NULL, '6', 'ORCprFVTabzdj6Jw', '09/09/2022 12:45:05', 'Active', 'vivian', '2022-09-09 11:45:05', '2022-09-09 11:45:05'),
(124, 'ICC/90998/09', 'Ken Developer', '11', '10', NULL, NULL, '21', '6', '7', '6', NULL, '6', 'ORCprFVTabzdj6Jw', '09/09/2022 12:45:05', 'Active', 'vivian', '2022-09-09 11:45:05', '2022-09-09 11:45:05'),
(125, 'CS/30303', 'fdfvsvs', '14', '20', NULL, NULL, '34', '6', '7', '6', NULL, '6', 'ORCprFVTabzdj6Jw', '09/09/2022 12:45:05', 'Active', 'vivian', '2022-09-09 11:45:05', '2022-09-09 11:45:05'),
(126, 'SS/P/2022', 'Uwadia', '5', '5', NULL, NULL, '10', '6', '8', '12', '2', '6', '7ZmhL46aMlJXHqsz', '24/09/2022 09:21:34', 'Active', 'Ken220', '2022-09-24 08:21:34', '2022-09-24 08:21:34'),
(127, 'wewewe333', 'regerg', '6', '7', NULL, NULL, '13', '6', '8', '12', '2', '6', '7ZmhL46aMlJXHqsz', '24/09/2022 09:21:34', 'Active', 'Ken220', '2022-09-24 08:21:34', '2022-09-24 08:21:34'),
(128, 'CS/30303', 'fdfvsvs', '3', '3', NULL, NULL, '6', '6', '8', '3', NULL, '6', 'TfjznEWMrN5LdtG8', '24/09/2022 09:39:28', 'Deleted', 'vivian', '2022-09-24 08:39:28', '2022-09-24 08:39:43'),
(129, 'ICC/90998/09', 'Ken Developer', '4', '4', NULL, NULL, '8', '6', '8', '3', NULL, '6', 'TfjznEWMrN5LdtG8', '24/09/2022 09:39:28', 'Deleted', 'vivian', '2022-09-24 08:39:28', '2022-09-24 08:39:43'),
(130, 'wewewe333', 'regerg', '5', '5', NULL, NULL, '10', '6', '8', '3', NULL, '6', 'TfjznEWMrN5LdtG8', '24/09/2022 09:39:28', 'Deleted', 'vivian', '2022-09-24 08:39:28', '2022-09-24 08:39:43');

-- --------------------------------------------------------

--
-- Table structure for table `result_process_starts`
--

CREATE TABLE `result_process_starts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `school_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `school_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `school_category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `r_tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addby_id` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `r_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `r_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `result_process_starts`
--

INSERT INTO `result_process_starts` (`id`, `school_year`, `school_term`, `class`, `school_category`, `subject`, `r_tid`, `addby`, `addby_id`, `r_status`, `r_date`, `created_at`, `updated_at`) VALUES
(91, '7', '8', '6', '1', '1', 'G6wkOI0lmd58Zqhc', 'Ken220', NULL, 'Deleted', '28/08/2022 12:11:04', '2022-08-28 11:11:04', '2022-09-01 15:29:42'),
(92, '5', '8', '6', '2', '12', 'uNMonAvcUX0xKD5t', 'Ken220', NULL, 'Deleted', '01/09/2022 15:18:06', '2022-09-01 14:18:06', '2022-09-01 15:29:39'),
(93, '5', '8', '6', '2', '12', '2sfG4yVYUZRXmkWA', 'Ken220', NULL, 'Deleted', '01/09/2022 15:59:58', '2022-09-01 14:59:58', '2022-09-01 15:29:35'),
(94, '6', '7', '6', '1', '12', 'SeDyRJNPQfC3XF7c', 'Ken220', NULL, 'Deleted', '01/09/2022 16:05:56', '2022-09-01 15:05:56', '2022-09-01 15:29:31'),
(96, '2015/2016', 'Third Term', 'JSS 3A', 'Pre-Nursery', 'Music', 'VX524MZpB3yuDnQW', 'Ken220', '5', 'Saved, Successfully', '01/09/2022 16:18:26', '2022-09-01 15:18:26', '2022-09-01 15:18:26'),
(98, '2013/2014', 'First Term', 'JSS 3A', 'Primary School', 'Writing', 'DMNWHacCitJ9K2bv', 'Ken220', '5', 'Saved, Successfully', '01/09/2022 16:22:46', '2022-09-01 15:22:46', '2022-09-01 15:22:46'),
(100, '2013/2014', 'First Term', 'JSS 3A', 'Primary School', 'Physic', 'hmPrc9zxp7EWFVbl', 'Ken220', '5', 'Deleted', '01/09/2022 16:29:12', '2022-09-01 15:29:12', '2022-09-02 10:09:05'),
(102, '2015/2016', 'First Term', 'JSS 3A', 'Primary School', 'Accounting', '4QO9dloYWLAw178h', 'Ken220', '5', 'Deleted', '02/09/2022 10:40:39', '2022-09-02 09:40:39', '2022-09-02 09:47:02'),
(104, '2013/2014', 'First Term', 'JSS 3A', 'Primary School', 'Accounting', '56LF42zOacv3GXgA', 'Ken220', '5', 'Deleted', '02/09/2022 11:04:48', '2022-09-02 10:04:48', '2022-09-02 10:09:01'),
(106, '2015/2016', 'First Term', 'JSS 3A', 'Primary School', 'Accounting', 'sw3dbIWVDgMJpmCl', 'Ken220', '5', 'Deleted', '02/09/2022 11:06:53', '2022-09-02 10:06:53', '2022-09-02 10:08:58'),
(108, '2013/2014', 'Third Term', 'JSS 3A', 'Primary School', 'Physic', '5lbF2ARCPXMT0pyB', 'Ken220', '5', 'Deleted', '02/09/2022 11:09:44', '2022-09-02 10:09:44', '2022-09-02 10:29:03'),
(110, '2013/2014', 'Third Term', 'JSS 3A', 'Primary School', 'Accounting', 'nuQmUbcNk9fPYw0E', 'Ken220', '5', 'Saved, Successfully', '02/09/2022 11:30:22', '2022-09-02 10:30:22', '2022-09-02 10:30:22'),
(112, '2011/2012', 'First Term', 'JSS 3A', 'Pre-Nursery', 'Writing', 'uCUcPbi1NthsOrXL', 'Ken220', '5', 'Deleted', '02/09/2022 12:33:57', '2022-09-02 11:33:57', '2022-09-08 19:47:31'),
(119, '2011/2012', 'First Term', 'JSS 3A', 'Primary School', 'Accounting', 'joEgOUuGhRWXfPcL', 'Ken220', '5', 'Saved, Successfully', '02/09/2022 13:24:11', '2022-09-02 12:24:11', '2022-09-02 12:24:11'),
(120, '6', '8', '6', '2', '12', '08IdYsJeo2qwUcOy', 'Ken220', NULL, 'Deleted', '02/09/2022 13:31:24', '2022-09-02 12:31:24', '2022-09-02 13:27:05'),
(121, '2011/2012', 'Third Term', 'JSS 3A', 'Pre-Nursery', 'Music', 'WtbisFVTK4JznRGk', 'Ken220', '5', 'Deleted', '02/09/2022 14:01:25', '2022-09-02 13:01:25', '2022-09-02 13:26:49'),
(122, '2011/2012', 'Third Term', 'JSS 3A', 'Pre-Nursery', 'Music', 'WtbisFVTK4JznRGk', 'Ken220', '5', 'Deleted', '02/09/2022 14:05:33', '2022-09-02 13:05:33', '2022-09-02 13:15:11'),
(124, '2011/2012', 'Third Term', 'JSS 3A', 'Pre-Nursery', 'Writing', 'gbtDZ624FTxN5X10', 'Ken220', '5', 'Deleted', '02/09/2022 14:17:24', '2022-09-02 13:17:24', '2022-09-02 13:26:54'),
(126, '2015/2016', 'First Term', 'JSS 3A', 'Pre-Nursery', 'Accounting', '1whzl3OPvExbGpro', 'Ken220', '5', 'Saved, Successfully', '02/09/2022 14:30:34', '2022-09-02 13:30:34', '2022-09-02 13:30:34'),
(128, '2011/2012', 'First Term', 'JSS 3A', 'Pre-Nursery', 'Writing', 'QNM0G84WL6pyOBJe', 'Ken220', '5', 'Saved, Successfully', '02/09/2022 14:39:48', '2022-09-02 13:39:48', '2022-09-08 18:07:57'),
(134, '2015/2016', 'First Term', 'JSS 3A', NULL, 'Economics', 'ZGDwbr29JHmzWg16', 'vivian', '5', 'Saved, Successfully', '08/09/2022 20:46:50', '2022-09-08 19:46:50', '2022-09-08 19:46:50'),
(137, '2015/2016', 'Third Term', 'JSS 3A', NULL, 'Economics', '9kLcYAxdSq01h8lK', 'vivian', '5', 'Saved, Successfully', '09/09/2022 09:53:21', '2022-09-09 08:53:21', '2022-09-09 08:53:21'),
(139, '2011/2012', 'First Term', 'JSS 3A', NULL, 'Physic Updated', 'gXNzdb8vti72PRAq', 'vivian', '5', 'Saved, Successfully', '09/09/2022 10:27:44', '2022-09-09 09:27:44', '2022-09-09 09:27:44'),
(140, '7', '7', '6', NULL, '8', 'gNBMq9QKyajimxXt', 'vivian', '5', 'Deleted', '09/09/2022 12:26:00', '2022-09-09 11:26:00', '2022-09-17 20:35:03'),
(141, '6', '8', '6', NULL, '6', 'bi3clRz0ML4a6W5p', 'vivian', '5', 'Deleted', '23/09/2022 14:25:05', '2022-09-23 13:25:05', '2022-09-23 19:55:10'),
(143, '2013/2014', 'Third Term', 'JSS 3A', 'Pre-Nursery', 'Music', 'kVnI10ZKYpBPoa3r', 'Ken220', NULL, 'Saved, Successfully', '23/09/2022 20:55:05', '2022-09-23 19:55:05', '2022-09-23 19:55:05'),
(145, '2013/2014', 'Third Term', 'JSS 3A', 'Primary School', 'Writing', 'yo9Q0A7PpwFLnOTr', 'Ken220', NULL, 'Saved, Successfully', '23/09/2022 21:01:19', '2022-09-23 20:01:19', '2022-09-23 20:01:19'),
(148, '2013/2014', 'Third Term', 'JSS 3A', 'Pre-Nursery', 'Physic', '5dGkTFl2gS3VaBHc', 'Ken220', NULL, 'Saved, Successfully', '24/09/2022 09:10:15', '2022-09-24 08:10:15', '2022-09-24 08:10:15'),
(150, '2013/2014', 'Third Term', 'JSS 3A', NULL, 'Economics', 'HVAMxUydKTF2Rr8z', 'vivian', '5', 'Deleted', '24/09/2022 09:33:48', '2022-09-24 08:33:48', '2022-09-24 08:34:43');

-- --------------------------------------------------------

--
-- Table structure for table `result_saves`
--

CREATE TABLE `result_saves` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `admin_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ca_1` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ca_2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ca_total` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exam_score` float(15,2) NOT NULL,
  `total` float NOT NULL,
  `subject` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `record_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `res_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reg_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `result_saves`
--

INSERT INTO `result_saves` (`id`, `admin_number`, `ca_1`, `ca_2`, `ca_total`, `year`, `term`, `class`, `exam_score`, `total`, `subject`, `record_id`, `addby`, `res_status`, `reg_date`, `created_at`, `updated_at`) VALUES
(1, 'CS/30303', '2', '2', '4', '6', '7', '6', 2.00, 6, '2', '3rdtaYOEPzcUhg29', 'Ken', 'Active', '09/08/2022 10:37:24', '2022-08-09 09:37:24', '2022-08-09 09:37:24'),
(2, 'ICC/90998/09', '2', '2', '4', '6', '7', '6', 2.00, 6, '2', '3rdtaYOEPzcUhg29', 'Ken', 'Active', '09/08/2022 10:37:24', '2022-08-09 09:37:24', '2022-08-09 09:37:24'),
(3, 'wewewe333', '2', '2', '4', '6', '7', '6', 2.00, 6, '2', '3rdtaYOEPzcUhg29', 'Ken', 'Active', '09/08/2022 10:37:24', '2022-08-09 09:37:24', '2022-08-09 09:37:24'),
(4, 'CS/30303', '5', '2', '7', '7', '8', '6', 34.00, 41, '2', 'xjLOrpbeAV3WlHN4', 'Ken', 'Active', '09/08/2022 10:38:18', '2022-08-09 09:38:18', '2022-08-09 09:38:18'),
(5, 'ICC/90998/09', '3', '1', '4', '7', '8', '6', 34.00, 38, '2', 'xjLOrpbeAV3WlHN4', 'Ken', 'Active', '09/08/2022 10:38:18', '2022-08-09 09:38:18', '2022-08-09 09:38:18'),
(6, 'wewewe333', '6', '20', '26', '7', '8', '6', 56.00, 82, '2', 'xjLOrpbeAV3WlHN4', 'Ken', 'Active', '09/08/2022 10:38:18', '2022-08-09 09:38:18', '2022-08-09 09:38:18');

-- --------------------------------------------------------

--
-- Table structure for table `result_tables`
--

CREATE TABLE `result_tables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `admin_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academic_year` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `academy_term` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `class` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `school_category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_ca` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `second_ca` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `earn_hrs` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hrs_work` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tca_score` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exam_scores` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_scores` bigint(20) DEFAULT NULL,
  `grade` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `average_scores` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class_total` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tid_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `student_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `result_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `result_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `result_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `result_lowest` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `result_highest` bigint(191) DEFAULT NULL,
  `result_action_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `result_tables`
--

INSERT INTO `result_tables` (`id`, `admin_number`, `academic_year`, `academy_term`, `subject`, `class`, `school_category`, `first_ca`, `second_ca`, `earn_hrs`, `hrs_work`, `tca_score`, `exam_scores`, `total_scores`, `grade`, `remark`, `position`, `average_scores`, `class_total`, `tid_code`, `username`, `student_name`, `result_date`, `result_action`, `result_status`, `result_lowest`, `result_highest`, `result_action_date`, `created_at`, `updated_at`) VALUES
(144, 'CS/30303', '6', '7', '1', '6', '1', '13', '11', NULL, NULL, '28', '44', 72, 'B', 'Very Good', NULL, '60.666666666667', NULL, 'FEOmaTKCerMuZGSx', 'Ken220', 'fdfvsvs', '13/08/2022 16:33:55', NULL, 'Active', '51', 72, NULL, '2022-08-13 15:33:55', '2022-09-08 12:55:23'),
(145, 'wewewe333', '6', '7', '6', '6', '1', '2', '2', NULL, NULL, '4', '38', 72, 'F', 'Fail', NULL, '44', NULL, '9u8HSXV7UgjtPsRq', 'Ken220', 'regerg', '16/08/2022 14:15:34', NULL, 'Active', '39', 49, NULL, '2022-08-16 13:15:34', '2022-08-16 13:15:34'),
(146, 'ICC/90998/09', '6', '7', '6', '6', '1', '2', '2', NULL, NULL, '4', '45', 49, 'E', 'Fair', NULL, '44', NULL, '9u8HSXV7UgjtPsRq', 'Ken220', 'Ken Developer', '16/08/2022 14:15:34', NULL, 'Active', '39', 49, NULL, '2022-08-16 13:15:34', '2022-08-16 13:15:34'),
(147, 'ICC/90998/10', '6', '7', '2', '6', '1', '12', '15', NULL, NULL, '27', '38', 65, 'B', 'Good', NULL, '43', NULL, NULL, NULL, 'Daniel Joe', '16/08/2022 14:15:34', NULL, 'Active', NULL, NULL, NULL, NULL, NULL),
(148, 'CS/30303', '7', '7', '6', '6', '1', '11', '14', NULL, NULL, '25', '35', 60, 'C', 'Good', NULL, '68.333333333333', NULL, 'QEjhwdRr98OWF40x', 'Ken220', 'fdfvsvs', '19/08/2022 13:31:25', NULL, 'Deleted', '60', 82, NULL, '2022-08-19 12:31:25', '2022-08-31 13:37:21'),
(149, 'ICC/90998/09', '7', '7', '6', '6', '1', '12', '15', NULL, NULL, '27', '55', 82, 'A', 'Excellent', NULL, '68.333333333333', NULL, 'QEjhwdRr98OWF40x', 'Ken220', 'Ken Developer', '19/08/2022 13:31:25', NULL, 'Deleted', '60', 82, NULL, '2022-08-19 12:31:25', '2022-08-31 13:37:21'),
(150, 'wewewe333', '7', '7', '6', '6', '1', '13', '16', NULL, NULL, '29', '34', 63, 'C', 'Good', NULL, '68.333333333333', NULL, 'QEjhwdRr98OWF40x', 'Ken220', 'regerg', '19/08/2022 13:31:25', NULL, 'Deleted', '60', 82, NULL, '2022-08-19 12:31:25', '2022-08-31 13:37:21'),
(151, 'wewewe333', '7', '8', '7', '6', '1', '12', '11', NULL, NULL, '23', '45', 68, 'C', 'Good', NULL, '65', NULL, 'yhDMJP97b5rsu64S', 'Ken220', 'regerg', '19/08/2022 14:00:28', NULL, 'Active', '51', 76, NULL, '2022-08-19 13:00:28', '2022-08-19 13:00:28'),
(152, 'ICC/90998/09', '7', '8', '7', '6', '1', '2', '5', NULL, NULL, '7', '44', 51, 'D', 'Pass', NULL, '65', NULL, 'yhDMJP97b5rsu64S', 'Ken220', 'Ken Developer', '19/08/2022 14:00:28', NULL, 'Active', '51', 76, NULL, '2022-08-19 13:00:28', '2022-08-19 13:00:28'),
(153, 'CS/30303', '7', '8', '7', '6', '1', '16', '15', NULL, NULL, '31', '45', 76, 'B', 'Very Good', NULL, '65', NULL, 'yhDMJP97b5rsu64S', 'Ken220', 'fdfvsvs', '19/08/2022 14:00:28', NULL, 'Active', '51', 76, NULL, '2022-08-19 13:00:28', '2022-08-19 13:00:28'),
(154, '200', 'sale', '2', 'new', 'sales of materials', '1', '8', '2', NULL, NULL, '10', '6', 16, 'B', 'Good', '1', '20', NULL, 'cNExT5mpOgnPGwZh', 'Ken220', 'John', '01/09/2022 13:29:47', NULL, 'Active', '10', 12, NULL, '2022-09-01 12:29:47', '2022-09-01 12:29:47'),
(155, '1000', 'purchase', '3', 'Payment', 'Payment for New Items', '1', '8', '2', NULL, NULL, '10', '6', 16, 'B', 'Good', '2', '20', NULL, 'cNExT5mpOgnPGwZh', 'Ken220', 'Pery', '01/09/2022 13:29:47', NULL, 'Active', '10', 12, NULL, '2022-09-01 12:29:47', '2022-09-01 12:29:47'),
(156, '2500', 'Repair', '1', 'Expense', 'Repaire of Generator', '1', '8', '2', NULL, NULL, '10', '6', 16, 'B', 'Good', '3', '20', NULL, 'cNExT5mpOgnPGwZh', 'Ken220', 'Pual', '01/09/2022 13:29:47', NULL, 'Active', '10', 12, NULL, '2022-09-01 12:29:47', '2022-09-01 12:29:47'),
(157, '50000', 'Salar', '2', 'Expense', 'Payment for staff salar', '1', '8', '2', NULL, NULL, '10', '6', 16, 'B', 'Good', '4', '20', NULL, 'cNExT5mpOgnPGwZh', 'Ken220', 'Mary', '01/09/2022 13:29:47', NULL, 'Active', '10', 12, NULL, '2022-09-01 12:29:47', '2022-09-01 12:29:47'),
(158, 'CS/30303', '7', '8', '12', '6', '2', '12', '20', NULL, NULL, '32', '55', 87, 'A', 'Excellent', NULL, '92', NULL, 'VX524MZpB3yuDnQW', 'Ken220', 'fdfvsvs', '01/09/2022 16:18:26', NULL, 'Active', '87', 101, NULL, '2022-09-01 15:18:26', '2022-09-01 15:18:26'),
(159, 'ICC/90998/09', '7', '8', '12', '6', '2', '13', '19', NULL, NULL, '32', '56', 88, 'A', 'Excellent', NULL, '92', NULL, 'VX524MZpB3yuDnQW', 'Ken220', 'Ken Developer', '01/09/2022 16:18:26', NULL, 'Active', '87', 101, NULL, '2022-09-01 15:18:26', '2022-09-01 15:18:26'),
(160, 'wewewe333', '7', '8', '12', '6', '2', '14', '30', NULL, NULL, '44', '57', 101, 'A', 'Excellent', NULL, '92', NULL, 'VX524MZpB3yuDnQW', 'Ken220', 'regerg', '01/09/2022 16:18:26', NULL, 'Active', '87', 101, NULL, '2022-09-01 15:18:26', '2022-09-01 15:18:26'),
(161, 'CS/30303', '6', '7', '13', '6', '1', '2', '9', NULL, NULL, '11', '56', 67, 'C', 'Good', NULL, '70', NULL, 'DMNWHacCitJ9K2bv', 'Ken220', 'fdfvsvs', '01/09/2022 16:22:46', NULL, 'Active', '65', 78, NULL, '2022-09-01 15:22:46', '2022-09-01 15:22:46'),
(162, 'ICC/90998/09', '6', '7', '13', '6', '1', '5', '10', NULL, NULL, '15', '50', 65, 'C', 'Good', NULL, '70', NULL, 'DMNWHacCitJ9K2bv', 'Ken220', 'Ken Developer', '01/09/2022 16:22:46', NULL, 'Active', '65', 78, NULL, '2022-09-01 15:22:46', '2022-09-01 15:22:46'),
(163, 'wewewe333', '6', '7', '13', '6', '1', '7', '11', NULL, NULL, '18', '60', 78, 'B', 'Very Good', NULL, '70', NULL, 'DMNWHacCitJ9K2bv', 'Ken220', 'regerg', '01/09/2022 16:22:46', NULL, 'Active', '65', 78, NULL, '2022-09-01 15:22:46', '2022-09-01 15:22:46'),
(164, 'SS/P/2022', '6', '7', '14', '6', '1', '2', '8', NULL, NULL, '10', '44', 54, 'D', 'Pass', NULL, '71.333333333333', NULL, 'hmPrc9zxp7EWFVbl', 'Ken220', 'fdfvsvs', '01/09/2022 16:29:11', NULL, 'Deleted', '54', 82, '02/09/2022 11:09:05', '2022-09-01 15:29:11', '2022-09-02 10:09:05'),
(165, 'SS/P/2022', '6', '7', '14', '6', '1', '12', '11', NULL, NULL, '23', '55', 78, 'B', 'Very Good', NULL, '71.333333333333', NULL, 'hmPrc9zxp7EWFVbl', 'Ken220', 'Ken Developer', '01/09/2022 16:29:11', NULL, 'Deleted', '54', 82, '02/09/2022 11:09:05', '2022-09-01 15:29:11', '2022-09-02 10:09:05'),
(191, 'SS/P/2022', '6', '8', '15', '6', '1', '1', '5', NULL, NULL, '6', '55', 61, 'C', 'Good', NULL, '57', NULL, 'nuQmUbcNk9fPYw0E', 'Ken220', 'regerg', '02/09/2022 11:30:22', NULL, 'Active', '51', 61, NULL, '2022-09-02 10:30:22', '2022-09-02 10:30:22'),
(225, 'SS/P/2022', '5', '7', '5', '6', '1', '13', '4', NULL, NULL, '17', '34', 51, 'D', 'Pass', '1', '48', NULL, 'joEgOUuGhRWXfPcL', 'Ken220', 'fdfvsvs', '02/09/2022 13:24:11', NULL, 'Active', '42', 51, NULL, '2022-09-02 12:24:11', '2022-09-02 12:24:11'),
(226, 'SS/P/2022', '5', '7', '7', '6', '1', '2', '5', NULL, NULL, '7', '44', 51, 'D', 'Pass', '1', '48', NULL, 'joEgOUuGhRWXfPcL', 'Ken220', 'Ken Developer', '02/09/2022 13:24:11', NULL, 'Active', '42', 51, NULL, '2022-09-02 12:24:11', '2022-09-02 12:24:11'),
(227, 'SS/P/2022', '5', '7', '15', '6', '1', '3', '6', NULL, NULL, '9', '33', 42, 'E', 'Fair', '3', '48', NULL, 'joEgOUuGhRWXfPcL', 'Ken220', 'regerg', '02/09/2022 13:24:11', NULL, 'Active', '42', 51, NULL, '2022-09-02 12:24:11', '2022-09-02 12:24:11'),
(237, 'SS/P/2022', '5', '8', '13', '6', '2', '5', '6', NULL, NULL, '11', '55', 66, 'C', 'Good', '1', '51.666666666667', NULL, 'gbtDZ624FTxN5X10', 'Ken220', 'fdfvsvs', '02/09/2022 14:17:24', NULL, 'Deleted', '38', 66, '02/09/2022 14:26:54', '2022-09-02 13:17:24', '2022-09-02 13:26:54'),
(238, 'SS/P/2022', '5', '8', '13', '6', '2', '3', '4', NULL, NULL, '7', '44', 51, 'D', 'Pass', '2', '51.666666666667', NULL, 'gbtDZ624FTxN5X10', 'Ken220', 'Ken Developer', '02/09/2022 14:17:24', NULL, 'Deleted', '38', 66, '02/09/2022 14:26:54', '2022-09-02 13:17:24', '2022-09-02 13:26:54'),
(239, 'SS/P/2022', '5', '8', '13', '6', '2', '2', '3', NULL, NULL, '5', '33', 38, 'F', 'Fail', '3', '51.666666666667', NULL, 'gbtDZ624FTxN5X10', 'Ken220', 'regerg', '02/09/2022 14:17:24', NULL, 'Deleted', '38', 66, '02/09/2022 14:26:54', '2022-09-02 13:17:24', '2022-09-02 13:26:54'),
(243, 'CS/30303', '7', '7', '15', '6', '2', '2', '2', NULL, NULL, '4', '2', 6, 'F', 'Fail', '1', '6', NULL, '1whzl3OPvExbGpro', 'Ken220', 'fdfvsvs', '02/09/2022 14:30:34', NULL, 'Active', '6', 6, NULL, '2022-09-02 13:30:34', '2022-09-02 13:30:34'),
(244, 'ICC/90998/09', '7', '7', '15', '6', '2', '2', '2', NULL, NULL, '4', '2', 6, 'F', 'Fail', '1', '6', NULL, '1whzl3OPvExbGpro', 'Ken220', 'Ken Developer', '02/09/2022 14:30:34', NULL, 'Active', '6', 6, NULL, '2022-09-02 13:30:34', '2022-09-02 13:30:34'),
(245, 'wewewe333', '7', '7', '15', '6', '2', '2', '2', NULL, NULL, '4', '2', 6, 'F', 'Fail', '1', '6', NULL, '1whzl3OPvExbGpro', 'Ken220', 'regerg', '02/09/2022 14:30:34', NULL, 'Active', '6', 6, NULL, '2022-09-02 13:30:34', '2022-09-02 13:30:34'),
(249, 'CS/30303', '5', '7', '13', '6', '2', '31', '51', NULL, NULL, '81', '441', 521, 'D1', 'Pass1', '11', '411', NULL, 'QNM0G84WL6pyOBJe', 'Ken220', 'fdfvsvs', '02/09/2022 14:39:48', NULL, 'Deleted', '321', 521, '08/09/2022 19:07:57', '2022-09-02 13:39:48', '2022-09-08 18:07:57'),
(250, 'wewewe333', '5', '7', '13', '6', '2', '3', '3', NULL, NULL, '6', '33', 39, 'F', 'Fail', '2', '41', NULL, 'QNM0G84WL6pyOBJe', 'Ken220', 'regerg', '02/09/2022 14:39:48', NULL, 'Deleted', '32', 52, '08/09/2022 19:07:57', '2022-09-02 13:39:48', '2022-09-08 18:07:57'),
(251, 'ICC/90998/09', '5', '7', '13', '6', '2', '4', '5', NULL, NULL, '9', '23', 32, 'F', 'Fail', '3', '41', NULL, 'QNM0G84WL6pyOBJe', 'Ken220', 'Ken Developer', '02/09/2022 14:39:48', NULL, 'Deleted', '32', 52, '08/09/2022 19:07:57', '2022-09-02 13:39:48', '2022-09-08 18:07:57'),
(267, 'wewewe333', '7', '7', '9', '6', NULL, '140', '17', NULL, NULL, '31', '56', 87, 'A', 'Excellent', '1', '80', NULL, 'ZGDwbr29JHmzWg16', 'vivian', 'regerg', '08/09/2022 20:46:50', NULL, 'Deleted', '71', 87, NULL, '2022-09-08 19:46:50', '2022-09-08 19:48:24'),
(268, 'ICC/90998/09', '7', '7', '9', '6', NULL, '11', '12', NULL, NULL, '23', '59', 82, 'A', 'Excellent', '2', '80', NULL, 'ZGDwbr29JHmzWg16', 'vivian', 'Ken Developer', '08/09/2022 20:46:50', NULL, 'Active', '71', 87, NULL, '2022-09-08 19:46:50', '2022-09-08 19:46:50'),
(269, 'CS/30303', '7', '7', '9', '6', NULL, '12', '15', NULL, NULL, '27', '44', 71, 'B', 'Very Good', '3', '80', NULL, 'ZGDwbr29JHmzWg16', 'vivian', 'fdfvsvs', '08/09/2022 20:46:50', NULL, 'Active', '71', 87, NULL, '2022-09-08 19:46:50', '2022-09-08 19:46:50'),
(273, 'wewewe333', '7', '8', '8', '6', NULL, '3', '4', NULL, NULL, '7', '44', 51, 'D', 'Pass', '1', '40', NULL, '9kLcYAxdSq01h8lK', 'vivian', 'regerg', '09/09/2022 09:53:21', NULL, 'Active', '29', 51, NULL, '2022-09-09 08:53:21', '2022-09-09 08:53:21'),
(274, 'CS/30303', '7', '8', '8', '6', NULL, '3', '4', NULL, NULL, '7', '33', 40, 'E', 'Fair', '2', '40', NULL, '9kLcYAxdSq01h8lK', 'vivian', 'fdfvsvs', '09/09/2022 09:53:21', NULL, 'Active', '29', 51, NULL, '2022-09-09 08:53:21', '2022-09-09 08:53:21'),
(275, 'ICC/90998/09', '7', '8', '8', '6', NULL, '3', '4', NULL, NULL, '7', '22', 29, 'F', 'Fail', '3', '40', NULL, '9kLcYAxdSq01h8lK', 'vivian', 'Ken Developer', '09/09/2022 09:53:21', NULL, 'Active', '29', 51, NULL, '2022-09-09 08:53:21', '2022-09-09 08:53:21'),
(279, 'ICC/90998/09', '5', '7', '4', '6', NULL, '13', '14', NULL, NULL, '27', '55', 82, 'A', 'Excellent', '1', '68.666666666667', NULL, 'gXNzdb8vti72PRAq', 'vivian', 'Ken Developer', '09/09/2022 10:27:44', NULL, 'Active', '58', 82, NULL, '2022-09-09 09:27:44', '2022-09-09 09:27:44'),
(280, 'CS/30303', '5', '7', '4', '6', NULL, '10', '12', NULL, NULL, '22', '44', 66, 'C', 'Good', '2', '68.666666666667', NULL, 'gXNzdb8vti72PRAq', 'vivian', 'fdfvsvs', '09/09/2022 10:27:44', NULL, 'Active', '58', 82, NULL, '2022-09-09 09:27:44', '2022-09-09 09:27:44'),
(281, 'wewewe333', '5', '7', '4', '6', NULL, '12', '2', NULL, NULL, '14', '44', 58, 'D', 'Pass', '3', '68.666666666667', NULL, 'gXNzdb8vti72PRAq', 'vivian', 'regerg', '09/09/2022 10:27:44', NULL, 'Active', '58', 82, NULL, '2022-09-09 09:27:44', '2022-09-09 09:27:44'),
(288, 'CS/30303', '6', '8', '14', '6', '2', '3', '3', NULL, NULL, '6', '45', 51, 'D', 'Pass', '1', '51', NULL, '5dGkTFl2gS3VaBHc', 'Ken220', 'fdfvsvs', '24/09/2022 09:10:15', NULL, 'Active', '51', 51, NULL, '2022-09-24 08:10:15', '2022-09-24 08:10:15'),
(289, 'ICC/90998/09', '6', '8', '14', '6', '2', '2', '2', NULL, NULL, '4', '47', 51, 'D', 'Pass', '1', '51', NULL, '5dGkTFl2gS3VaBHc', 'Ken220', 'Ken Developer', '24/09/2022 09:10:15', NULL, 'Active', '51', 51, NULL, '2022-09-24 08:10:15', '2022-09-24 08:10:15'),
(292, 'wewewe333', '6', '8', '8', '6', NULL, '5', '5', NULL, NULL, '10', '60', 70, 'B', 'Very Good', '1', '61', NULL, 'HVAMxUydKTF2Rr8z', 'vivian', 'regerg', '24/09/2022 09:33:48', NULL, 'Deleted', '52', 70, '24/09/2022 09:34:43', '2022-09-24 08:33:48', '2022-09-24 08:34:43'),
(293, 'CS/30303', '6', '8', '8', '6', NULL, '4', '4', NULL, NULL, '8', '44', 52, 'D', 'Pass', '2', '61', NULL, 'HVAMxUydKTF2Rr8z', 'vivian', 'fdfvsvs', '24/09/2022 09:33:48', NULL, 'Deleted', '52', 70, '24/09/2022 09:34:43', '2022-09-24 08:33:48', '2022-09-24 08:34:43');

-- --------------------------------------------------------

--
-- Table structure for table `result_view_checks`
--

CREATE TABLE `result_view_checks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `view_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `view_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reg_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `result_view_checks`
--

INSERT INTO `result_view_checks` (`id`, `year`, `term`, `class`, `subject`, `category`, `status`, `view_by`, `view_code`, `reg_date`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, NULL, NULL, '2', 'Active', 'Ken220', 'qy2X4bUxzVWgOj5B', '12/08/2022 12:12:06', '2022-08-12 11:12:06', '2022-08-12 11:12:06'),
(2, '6', '7', '7', NULL, '1', 'Active', 'Ken220', 'sD6nSFr24ihHWZaR', '12/08/2022 12:13:31', '2022-08-12 11:13:31', '2022-08-12 11:13:31'),
(3, '6', '8', '6', NULL, '1', 'Active', 'Ken220', '7RDnU8iejyXMu4OE', '12/08/2022 12:14:56', '2022-08-12 11:14:56', '2022-08-12 11:14:56'),
(4, '7', '7', '7', NULL, '1', 'Active', 'Ken220', 'TWaRirYLHSuCkMsd', '12/08/2022 12:15:24', '2022-08-12 11:15:24', '2022-08-12 11:15:24'),
(5, '6', '8', '6', NULL, '1', 'Active', 'Ken220', 'naElmODr3o0ykI6Y', '12/08/2022 12:16:41', '2022-08-12 11:16:41', '2022-08-12 11:16:41'),
(6, '6', '7', '6', NULL, '1', 'Active', 'Ken220', 'LJjY8SNZqwM17tQf', '12/08/2022 12:17:50', '2022-08-12 11:17:50', '2022-08-12 11:17:50'),
(7, '6', '7', '6', NULL, '1', 'Active', 'Ken220', 'NPs0fvY2mEgoxBQk', '12/08/2022 12:31:15', '2022-08-12 11:31:15', '2022-08-12 11:31:15'),
(8, '6', '7', '6', NULL, '1', 'Active', 'Ken220', 'igkusmOnJLU5h2SP', '12/08/2022 12:32:01', '2022-08-12 11:32:01', '2022-08-12 11:32:01'),
(9, '6', '7', '6', NULL, '1', 'Active', 'Ken220', 'Y72HIGd1pi9bgykU', '12/08/2022 12:33:10', '2022-08-12 11:33:10', '2022-08-12 11:33:10'),
(10, '6', '8', '6', NULL, '1', 'Active', 'Ken220', 'YvSOCzTbd0NeojL3', '12/08/2022 12:34:33', '2022-08-12 11:34:33', '2022-08-12 11:34:33'),
(11, '7', '7', '6', NULL, '1', 'Active', 'Ken220', '31lkCJB0yX7EZ5VY', '12/08/2022 12:42:27', '2022-08-12 11:42:27', '2022-08-12 11:42:27'),
(12, '6', '7', '6', NULL, '2', 'Active', 'Ken220', 'HTBlyo9aQKWcs165', '12/08/2022 13:21:44', '2022-08-12 12:21:44', '2022-08-12 12:21:44'),
(13, '6', '7', '6', NULL, '1', 'Active', 'Ken220', 'to1A9fPsXh6W4R8O', '12/08/2022 13:22:09', '2022-08-12 12:22:09', '2022-08-12 12:22:09'),
(14, '7', '7', '6', NULL, '1', 'Active', 'Ken220', 'fNmdqhGM5beZwKun', '12/08/2022 13:22:22', '2022-08-12 12:22:22', '2022-08-12 12:22:22'),
(15, '7', '7', '6', NULL, '1', 'Active', 'Ken220', 'ZCVlsTbGLkyKRAxg', '12/08/2022 14:56:04', '2022-08-12 13:56:04', '2022-08-12 13:56:04'),
(16, '7', '7', '6', NULL, '1', 'Active', 'Ken220', 'LKgMF5GS79UahJB4', '13/08/2022 14:37:44', '2022-08-13 13:37:44', '2022-08-13 13:37:44'),
(19, '7', '7', '6', '1', NULL, 'Active', 'Ken220', 'dFGns56kvKUS41jY', '13/08/2022 15:55:30', '2022-08-13 14:55:30', '2022-08-13 14:55:30'),
(20, '7', '7', '6', NULL, '1', 'Active', 'Ken220', 'NPfkyCGHS6Mtoc5V', '13/08/2022 16:06:53', '2022-08-13 15:06:53', '2022-08-13 15:06:53'),
(21, '6', '7', '6', '1', NULL, 'Active', 'Ken220', 'MsJP67rXnguhmYVt', '19/08/2022 13:44:46', '2022-08-19 12:44:46', '2022-08-19 12:44:46'),
(22, '6', '7', '6', NULL, '1', 'Active', 'Ken220', 'nvcQgOLeAW4kVE1Y', '08/09/2022 13:53:19', '2022-09-08 12:53:19', '2022-09-08 12:53:19'),
(23, '5', '7', '6', NULL, '1', 'Active', 'Ken220', 't6ZIm7bNwAJKXMDf', '22/09/2022 20:02:23', '2022-09-22 19:02:23', '2022-09-22 19:02:23');

-- --------------------------------------------------------

--
-- Table structure for table `school_categories`
--

CREATE TABLE `school_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sc_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sc_add_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sc_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sc_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sc_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `school_categories`
--

INSERT INTO `school_categories` (`id`, `sc_name`, `sc_add_by`, `sc_status`, `sc_date`, `sc_action`, `created_at`, `updated_at`) VALUES
(1, 'Primary School', 'Ken220', 'Active', '31/07/2022 12:18:51', NULL, '2022-07-31 11:18:51', '2022-07-31 12:02:20'),
(2, 'Pre-Nursery', 'Ken220', 'Active', '31/07/2022 12:47:36', NULL, '2022-07-31 11:47:36', '2022-07-31 11:47:36'),
(3, 'Nusery School', 'Ken220', 'Deleted', '18/09/2022 14:20:09', NULL, '2022-09-18 13:20:09', '2022-09-18 13:20:21');

-- --------------------------------------------------------

--
-- Table structure for table `school_resumptions`
--

CREATE TABLE `school_resumptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `start_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `close_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `next_resumption` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `school_year` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `school_term` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `added_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `school_resumptions`
--

INSERT INTO `school_resumptions` (`id`, `start_date`, `close_date`, `next_resumption`, `school_year`, `school_term`, `added_by`, `status`, `add_date`, `created_at`, `updated_at`) VALUES
(1, '2022-07-04', '2022-07-08', '2022-07-12', '7', '7', 'Ken220', 'Deleted', '31/07/2022 14:39:42', '2022-07-31 13:39:42', '2022-07-31 14:57:45'),
(2, '2022-07-20', '2022-07-28', '2022-07-30', '6', '8', 'Ken220', 'Active', '31/07/2022 15:55:04', '2022-07-31 14:55:04', '2022-07-31 14:55:04'),
(3, '2022-07-09', '2022-07-11', '2022-07-06', '7', '7', 'Ken220', 'Active', '31/07/2022 15:57:17', '2022-07-31 14:57:17', '2022-07-31 14:57:17'),
(4, '2022-08-16', '2022-08-16', '2022-08-16', '5', '8', 'Ken220', 'Active', '03/08/2022 10:55:16', '2022-08-03 09:55:16', '2022-08-03 09:55:16');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `surname` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `other_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staff_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staff_user_id` int(20) DEFAULT NULL,
  `school_category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qualification` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acct_username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staff_password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staff_level` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `home_address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staff_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acct_status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acct_action` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reg_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `surname`, `other_name`, `sex`, `email`, `phone`, `dob`, `staff_id`, `staff_user_id`, `school_category`, `qualification`, `acct_username`, `staff_password`, `state`, `country`, `class`, `staff_level`, `home_address`, `staff_image`, `addby`, `acct_status`, `acct_action`, `reg_date`, `created_at`, `updated_at`) VALUES
(1, 'Bello 2', 'Young 2', 'Others', 'bellow2@gmail.com', '0987654345670000', '2022-08-19', '9909ooo', NULL, '2', 'BSC 2', 'bellow2', NULL, 'Benue', 'NG 2', '5', 'Teacher', 'dcvwcqeqwcqwq 2', NULL, 'Ken220', 'Pending', NULL, '04/08/2022 12:09:16', '2022-08-04 11:09:16', '2022-08-04 12:34:31'),
(2, 'Ken', 'Young', 'Male', 'ken@gmail.com', '08037250238', '2022-08-14', '778', NULL, '2', 'Software Eng.', 'ken', '$2y$10$iahc2Ly.Pqs2rTmKC0zpcunSTyDdJv0eClm.byt44c.BINBpfHi1S', 'Benue', 'UK', '6', 'Teacher', 'Home is good', 'uploads/staff_image/1659623727.jpg', 'Ken220', 'Active', NULL, '04/08/2022 13:23:40', '2022-08-04 12:23:40', '2022-08-04 14:50:03'),
(5, 'Uwadia', 'Vivian', 'Female', 'vivian@gmail.com', '08037250237', '2022-09-20', '2029/IUY', NULL, '2', 'ICT', 'vivian', '$2y$10$lbge7kaydwEVJj9Xw1947.Z03IALzXf2QbDveI8maqYLWCO5KMj82', 'Abia', 'Nigeria', '6', 'Teacher', 'New Road, Lagos', 'uploads/staff_image/1662832769.jpg', 'Ken220', 'Active', NULL, '06/09/2022 16:56:39', '2022-09-06 15:56:39', '2022-09-10 16:59:29');

-- --------------------------------------------------------

--
-- Table structure for table `start_attendances`
--

CREATE TABLE `start_attendances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sta_admin_no` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_stu_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_mark_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_submit_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_addeby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_class_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_year_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_term_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_tid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sta_date` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `start_attendances`
--

INSERT INTO `start_attendances` (`id`, `sta_admin_no`, `sta_stu_name`, `sta_class`, `sta_year`, `sta_term`, `sta_mark_date`, `sta_submit_date`, `sta_status`, `sta_addeby`, `sta_class_name`, `sta_year_name`, `sta_term_name`, `sta_tid`, `sta_date`, `created_at`, `updated_at`) VALUES
(28, 'wewewe333', 'regerg', '6', '7', '7', '2022-08-31', NULL, 'Marked', 'Ken220', 'JSS 3A', '2015/2016', 'First Term', 'jAb9VLXogsWeSQzc', '25/08/2022 17:06:16', NULL, '2022-08-25 16:06:41'),
(29, 'ICC/90998/09', 'Ken Developer', '6', '7', '7', '2022-08-31', NULL, 'Marked', 'Ken220', 'JSS 3A', '2015/2016', 'First Term', 'jAb9VLXogsWeSQzc', '25/08/2022 17:06:16', NULL, '2022-08-25 16:06:41'),
(30, 'CS/30303', 'fdfvsvs', '6', '7', '7', '2022-08-31', NULL, 'Marked', 'Ken220', 'JSS 3A', '2015/2016', 'First Term', 'jAb9VLXogsWeSQzc', '25/08/2022 17:06:16', NULL, '2022-08-25 16:06:41'),
(31, 'wewewe333', 'regerg', '6', '6', '7', '2022-08-13', NULL, 'Marked', 'Ken220', 'JSS 3A', '2013/2014', 'First Term', '6el4VNatz7iUZwHM', '25/08/2022 17:10:06', NULL, '2022-08-25 16:10:08'),
(32, 'ICC/90998/09', 'Ken Developer', '6', '6', '7', '2022-08-13', NULL, 'Marked', 'Ken220', 'JSS 3A', '2013/2014', 'First Term', '6el4VNatz7iUZwHM', '25/08/2022 17:10:06', NULL, '2022-08-25 16:10:08'),
(33, 'CS/30303', 'fdfvsvs', '6', '6', '7', '2022-08-13', NULL, 'Marked', 'Ken220', 'JSS 3A', '2013/2014', 'First Term', '6el4VNatz7iUZwHM', '25/08/2022 17:10:06', NULL, '2022-08-25 16:10:08'),
(34, 'wewewe333', 'regerg', '6', '6', '7', '2022-08-01', NULL, 'Marked', 'Ken220', 'JSS 3A', '2013/2014', 'First Term', 'luTYbje1PpHrCw7R', '25/08/2022 17:12:58', NULL, '2022-08-25 16:13:01'),
(35, 'ICC/90998/09', 'Ken Developer', '6', '6', '7', '2022-08-01', NULL, 'Marked', 'Ken220', 'JSS 3A', '2013/2014', 'First Term', 'luTYbje1PpHrCw7R', '25/08/2022 17:12:58', NULL, '2022-08-25 16:13:01'),
(36, 'CS/30303', 'fdfvsvs', '6', '6', '7', '2022-08-01', NULL, 'Marked', 'Ken220', 'JSS 3A', '2013/2014', 'First Term', 'luTYbje1PpHrCw7R', '25/08/2022 17:12:58', NULL, '2022-08-25 16:13:01'),
(37, 'wewewe333', 'regerg', '6', '6', '8', '2022-08-27', NULL, 'Marked', 'Ken220', 'JSS 3A', '2013/2014', 'Third Term', 'n4Gd2At5f39Hw6kz', '25/08/2022 17:13:25', NULL, '2022-08-25 16:13:40'),
(38, 'ICC/90998/09', 'Ken Developer', '6', '6', '8', '2022-08-27', NULL, 'Marked', 'Ken220', 'JSS 3A', '2013/2014', 'Third Term', 'n4Gd2At5f39Hw6kz', '25/08/2022 17:13:25', NULL, '2022-08-25 16:13:40'),
(39, 'CS/30303', 'fdfvsvs', '6', '6', '8', '2022-08-27', NULL, 'Marked', 'Ken220', 'JSS 3A', '2013/2014', 'Third Term', 'n4Gd2At5f39Hw6kz', '25/08/2022 17:13:25', NULL, '2022-08-25 16:13:40'),
(40, 'wewewe333', 'regerg', '6', '7', '8', '2022-08-27', NULL, 'Active', 'Ken220', 'JSS 3A', '2015/2016', 'Third Term', '71kHVrKY4Q89XSvz', '26/08/2022 16:51:58', NULL, '2022-08-26 16:53:53'),
(41, 'ICC/90998/09', 'Ken Developer', '6', '7', '8', '2022-08-27', NULL, 'Active', 'Ken220', 'JSS 3A', '2015/2016', 'Third Term', '71kHVrKY4Q89XSvz', '26/08/2022 16:51:58', NULL, '2022-08-26 16:53:55'),
(42, 'CS/30303', 'fdfvsvs', '6', '7', '8', '2022-08-27', NULL, 'Active', 'Ken220', 'JSS 3A', '2015/2016', 'Third Term', '71kHVrKY4Q89XSvz', '26/08/2022 16:51:58', NULL, '2022-08-26 16:53:57'),
(43, 'wewewe333', 'regerg', '6', '5', '8', '2022-08-29', NULL, 'Active', 'Ken220', 'JSS 3A', '2011/2012', 'Third Term', 'TXl8xaqesyFI0Uc2', '26/08/2022 18:06:10', NULL, '2022-08-26 17:14:39'),
(44, 'ICC/90998/09', 'Ken Developer', '6', '5', '8', '2022-08-29', NULL, 'Active', 'Ken220', 'JSS 3A', '2011/2012', 'Third Term', 'TXl8xaqesyFI0Uc2', '26/08/2022 18:06:10', NULL, '2022-08-26 17:14:41'),
(45, 'CS/30303', 'fdfvsvs', '6', '5', '8', '2022-08-29', NULL, 'Active', 'Ken220', 'JSS 3A', '2011/2012', 'Third Term', 'TXl8xaqesyFI0Uc2', '26/08/2022 18:06:10', NULL, '2022-08-26 17:14:43'),
(46, 'wewewe333', 'regerg', '6', '5', '7', '2022-09-22', NULL, 'Active', 'Ken220', 'JSS 3A', '2011/2012', 'First Term', '4diatExeMRzKG6lq', '10/09/2022 08:52:00', NULL, NULL),
(47, 'ICC/90998/09', 'Ken Developer', '6', '5', '7', '2022-09-22', NULL, 'Active', 'Ken220', 'JSS 3A', '2011/2012', 'First Term', '4diatExeMRzKG6lq', '10/09/2022 08:52:00', NULL, NULL),
(48, 'CS/30303', 'fdfvsvs', '6', '5', '7', '2022-09-22', NULL, 'Active', 'Ken220', 'JSS 3A', '2011/2012', 'First Term', '4diatExeMRzKG6lq', '10/09/2022 08:52:00', NULL, NULL),
(49, 'wewewe333', 'regerg', '6', '6', '8', '2022-09-27', NULL, 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'ucRDF1VYU94Xg5ZB', '10/09/2022 09:53:50', NULL, '2022-09-10 08:55:16'),
(50, 'ICC/90998/09', 'Ken Developer', '6', '6', '8', '2022-09-27', NULL, 'Active', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'ucRDF1VYU94Xg5ZB', '10/09/2022 09:53:50', NULL, '2022-09-10 08:55:34'),
(51, 'CS/30303', 'fdfvsvs', '6', '6', '8', '2022-09-27', NULL, 'Marked', 'vivian', 'JSS 3A', '2013/2014', 'Third Term', 'ucRDF1VYU94Xg5ZB', '10/09/2022 09:53:50', NULL, '2022-09-10 08:54:11'),
(52, 'wewewe333', 'regerg', '6', '5', '8', '2022-09-29', NULL, 'Marked', 'vivian', 'JSS 3A', '2011/2012', 'Third Term', 'o1uxNXaqWcrgvbsI', '10/09/2022 10:09:01', NULL, '2022-09-10 09:09:11'),
(53, 'ICC/90998/09', 'Ken Developer', '6', '5', '8', '2022-09-29', NULL, 'Marked', 'vivian', 'JSS 3A', '2011/2012', 'Third Term', 'o1uxNXaqWcrgvbsI', '10/09/2022 10:09:01', NULL, '2022-09-10 09:09:11'),
(54, 'CS/30303', 'fdfvsvs', '6', '5', '8', '2022-09-29', NULL, 'Marked', 'vivian', 'JSS 3A', '2011/2012', 'Third Term', 'o1uxNXaqWcrgvbsI', '10/09/2022 10:09:01', NULL, '2022-09-10 09:09:11');

-- --------------------------------------------------------

--
-- Table structure for table `start_graduations`
--

CREATE TABLE `start_graduations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gs_st_admin` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gs_st_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gs_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gs_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gs_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gs_added` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gs_tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gs_class_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gs_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `start_graduations`
--

INSERT INTO `start_graduations` (`id`, `gs_st_admin`, `gs_st_name`, `gs_class`, `gs_year`, `gs_status`, `gs_added`, `gs_tid`, `gs_class_name`, `gs_date`, `created_at`, `updated_at`) VALUES
(1, 'wewewe333', 'regerg', '6', '7', 'Initiated', 'Ken220', 'OU8DYmMgJEsd0u4v', NULL, '24/08/2022 19:37:16', NULL, NULL),
(2, 'ICC/90998/09', 'Ken Developer', '6', '7', 'Initiated', 'Ken220', 'OU8DYmMgJEsd0u4v', NULL, '24/08/2022 19:37:16', NULL, NULL),
(3, 'CS/30303', 'fdfvsvs', '6', '7', 'Initiated', 'Ken220', 'OU8DYmMgJEsd0u4v', NULL, '24/08/2022 19:37:16', NULL, NULL),
(4, 'wewewe333', 'regerg', '6', '6', 'Marked', 'Ken220', 'oHr913Lq0gUwmcOh', 'JSS 3A', '24/08/2022 19:55:55', NULL, '2022-08-24 20:00:43'),
(5, 'ICC/90998/09', 'Ken Developer', '6', '6', 'Initiated', 'Ken220', 'oHr913Lq0gUwmcOh', 'JSS 3A', '24/08/2022 19:55:55', NULL, '2022-08-24 19:54:01'),
(6, 'CS/30303', 'fdfvsvs', '6', '6', 'Marked', 'Ken220', 'oHr913Lq0gUwmcOh', 'JSS 3A', '24/08/2022 19:55:55', NULL, '2022-08-24 20:01:44'),
(7, 'wewewe333', 'regerg', '6', '7', 'Marked', 'Ken220', 'TR29XICuGhYeLKqj', 'JSS 3A', '24/08/2022 21:11:52', NULL, '2022-08-24 20:45:54'),
(8, 'ICC/90998/09', 'Ken Developer', '6', '7', 'Marked', 'Ken220', 'TR29XICuGhYeLKqj', 'JSS 3A', '24/08/2022 21:11:52', NULL, '2022-08-24 20:45:54'),
(9, 'CS/30303', 'fdfvsvs', '6', '7', 'Marked', 'Ken220', 'TR29XICuGhYeLKqj', 'JSS 3A', '24/08/2022 21:11:52', NULL, '2022-08-24 20:45:54'),
(10, 'wewewe333', 'regerg', '6', '7', 'Marked', 'Ken220', '9nh8bL3TgsXQkw7c', 'JSS 3A', '24/08/2022 21:51:13', NULL, '2022-08-24 20:51:19'),
(11, 'ICC/90998/09', 'Ken Developer', '6', '7', 'Marked', 'Ken220', '9nh8bL3TgsXQkw7c', 'JSS 3A', '24/08/2022 21:51:13', NULL, '2022-08-24 20:51:19'),
(12, 'CS/30303', 'fdfvsvs', '6', '7', 'Marked', 'Ken220', '9nh8bL3TgsXQkw7c', 'JSS 3A', '24/08/2022 21:51:13', NULL, '2022-08-24 20:51:19'),
(13, 'wewewe333', 'regerg', '6', '6', 'Initiated', 'Ken220', 'E93L4Zmwvnhgpf8R', 'JSS 3A', '24/08/2022 22:03:09', NULL, NULL),
(14, 'ICC/90998/09', 'Ken Developer', '6', '6', 'Initiated', 'Ken220', 'E93L4Zmwvnhgpf8R', 'JSS 3A', '24/08/2022 22:03:09', NULL, NULL),
(15, 'CS/30303', 'fdfvsvs', '6', '6', 'Initiated', 'Ken220', 'E93L4Zmwvnhgpf8R', 'JSS 3A', '24/08/2022 22:03:09', NULL, NULL),
(16, 'wewewe333', 'regerg', '6', '6', 'Initiated', 'Ken220', '7mDKdGMWfePnqSNb', 'JSS 3A', '24/08/2022 22:04:49', NULL, NULL),
(17, 'ICC/90998/09', 'Ken Developer', '6', '6', 'Initiated', 'Ken220', '7mDKdGMWfePnqSNb', 'JSS 3A', '24/08/2022 22:04:49', NULL, NULL),
(18, 'CS/30303', 'fdfvsvs', '6', '6', 'Initiated', 'Ken220', '7mDKdGMWfePnqSNb', 'JSS 3A', '24/08/2022 22:04:49', NULL, NULL),
(19, 'wewewe333', 'regerg', '6', '6', 'Initiated', 'Ken220', 'DErewodqBycU6Yia', 'JSS 3A', '24/08/2022 22:14:32', NULL, NULL),
(20, 'ICC/90998/09', 'Ken Developer', '6', '6', 'Initiated', 'Ken220', 'DErewodqBycU6Yia', 'JSS 3A', '24/08/2022 22:14:32', NULL, NULL),
(21, 'CS/30303', 'fdfvsvs', '6', '6', 'Initiated', 'Ken220', 'DErewodqBycU6Yia', 'JSS 3A', '24/08/2022 22:14:32', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `start_promotions`
--

CREATE TABLE `start_promotions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `stu_adm_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_next_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_addby` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_now_classname` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_next_classname` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `start_promotions`
--

INSERT INTO `start_promotions` (`id`, `stu_adm_number`, `stu_name`, `stu_class`, `stu_next_class`, `stu_status`, `stu_tid`, `stu_date`, `stu_addby`, `stu_now_classname`, `stu_next_classname`, `created_at`, `updated_at`) VALUES
(1, 'wewewe333', 'regerg', '6', '8', 'Marked', 'excID4P7Eb0mAVu1', '24/08/2022 12:46:46', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 11:46:48'),
(2, 'ICC/90998/09', 'Ken Developer', '6', '8', 'Marked', 'excID4P7Eb0mAVu1', '24/08/2022 12:46:46', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 11:46:48'),
(3, 'CS/30303', 'fdfvsvs', '6', '8', 'Marked', 'excID4P7Eb0mAVu1', '24/08/2022 12:46:46', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 11:46:48'),
(4, 'wewewe333', 'regerg', '6', '6', 'Returned', 'yFJLxupbrsCU5EtP', '24/08/2022 12:47:25', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 11:56:10'),
(5, 'ICC/90998/09', 'Ken Developer', '6', '6', 'Returned', 'yFJLxupbrsCU5EtP', '24/08/2022 12:47:25', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 11:57:19'),
(6, 'CS/30303', 'fdfvsvs', '6', '6', 'Returned', 'yFJLxupbrsCU5EtP', '24/08/2022 12:47:25', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 11:56:37'),
(7, 'wewewe333', 'regerg', '6', '8', 'Marked', 'lohksb5O3vCd8SBw', '24/08/2022 12:58:05', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 11:58:07'),
(8, 'ICC/90998/09', 'Ken Developer', '6', '8', 'Marked', 'lohksb5O3vCd8SBw', '24/08/2022 12:58:05', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 11:58:07'),
(9, 'CS/30303', 'fdfvsvs', '6', '8', 'Marked', 'lohksb5O3vCd8SBw', '24/08/2022 12:58:05', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 11:58:07'),
(10, 'wewewe333', 'regerg', '6', '6', 'Returned', 'JOoX4FiHmqj25cKN', '24/08/2022 12:58:18', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:00:38'),
(11, 'ICC/90998/09', 'Ken Developer', '6', '6', 'Returned', 'JOoX4FiHmqj25cKN', '24/08/2022 12:58:18', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:00:36'),
(12, 'CS/30303', 'fdfvsvs', '6', '6', 'Returned', 'JOoX4FiHmqj25cKN', '24/08/2022 12:58:18', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:00:31'),
(13, 'wewewe333', 'regerg', '6', '8', 'Marked', 'HGw3by1BpmqMTSE8', '24/08/2022 13:04:38', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 12:04:52'),
(14, 'ICC/90998/09', 'Ken Developer', '6', '8', 'Marked', 'HGw3by1BpmqMTSE8', '24/08/2022 13:04:38', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 12:04:52'),
(15, 'CS/30303', 'fdfvsvs', '6', '8', 'Marked', 'HGw3by1BpmqMTSE8', '24/08/2022 13:04:38', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 12:04:52'),
(16, 'wewewe333', 'regerg', '6', '6', 'Marked', 'MvAYZwjJN1RuE8HD', '24/08/2022 13:05:19', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:05:54'),
(17, 'ICC/90998/09', 'Ken Developer', '8', '6', 'Marked', 'MvAYZwjJN1RuE8HD', '24/08/2022 13:05:19', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:05:54'),
(18, 'CS/30303', 'fdfvsvs', '6', '6', 'Marked', 'MvAYZwjJN1RuE8HD', '24/08/2022 13:05:19', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:05:54'),
(19, 'wewewe333', 'regerg', '6', '8', 'Marked', 'lzQjJc4Otx87vHpe', '24/08/2022 13:07:16', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 12:08:05'),
(20, 'CS/30303', 'fdfvsvs', '6', '8', 'Marked', 'lzQjJc4Otx87vHpe', '24/08/2022 13:07:16', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 12:08:05'),
(21, 'wewewe333', 'regerg', '8', '6', 'Marked', 'OHETpfhMicCjAxXv', '24/08/2022 13:08:15', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:08:30'),
(22, 'ICC/90998/09', 'Ken Developer', '8', '6', 'Marked', 'OHETpfhMicCjAxXv', '24/08/2022 13:08:15', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:08:30'),
(23, 'CS/30303', 'fdfvsvs', '8', '6', 'Marked', 'OHETpfhMicCjAxXv', '24/08/2022 13:08:15', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:08:30'),
(24, 'wewewe333', 'regerg', '6', '8', 'Marked', 'l2tQbOYmx0W3aNH6', '24/08/2022 13:12:47', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 12:12:49'),
(25, 'ICC/90998/09', 'Ken Developer', '6', '8', 'Marked', 'l2tQbOYmx0W3aNH6', '24/08/2022 13:12:47', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 12:12:53'),
(26, 'CS/30303', 'fdfvsvs', '6', '8', 'Marked', 'l2tQbOYmx0W3aNH6', '24/08/2022 13:12:47', 'Ken220', 'JSS 3A', 'SS 2B', NULL, '2022-08-24 12:12:56'),
(27, 'wewewe333', 'regerg', '8', '6', 'Returned', 'vy5trhIVfTO8qMsP', '24/08/2022 13:13:10', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:13:49'),
(28, 'ICC/90998/09', 'Ken Developer', '8', '6', 'Returned', 'vy5trhIVfTO8qMsP', '24/08/2022 13:13:10', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:13:49'),
(29, 'CS/30303', 'fdfvsvs', '6', '6', 'Returned', 'vy5trhIVfTO8qMsP', '24/08/2022 13:13:10', 'Ken220', 'SS 2B', 'JSS 3A', NULL, '2022-08-24 12:13:49');

-- --------------------------------------------------------

--
-- Table structure for table `start_psychomoto_domains`
--

CREATE TABLE `start_psychomoto_domains` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `saff_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saff_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saff_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saff_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saff_tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saff_addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `saff_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `start_psychomoto_domains`
--

INSERT INTO `start_psychomoto_domains` (`id`, `saff_year`, `saff_term`, `saff_class`, `saff_status`, `saff_tid`, `saff_addby`, `saff_date`, `created_at`, `updated_at`) VALUES
(10, NULL, 'First Term', 'JSS 3A', 'Completed', 'v6E1ZNoC75dfnBJM', 'Ken220', '28/08/2022 15:14:57', '2022-08-28 14:14:57', '2022-08-28 14:15:29'),
(11, '2013/2014', 'Third Term', 'JSS 3A', 'Completed', 'n8xIK0HtLy3PhfeE', 'Ken220', '28/08/2022 16:49:31', '2022-08-28 15:49:31', '2022-08-28 15:51:52'),
(12, '2013/2014', 'First Term', 'JSS 3A', 'Completed', 'NUfEVDI62FMBqZdJ', 'Ken220', '29/08/2022 19:07:19', '2022-08-29 18:07:19', '2022-08-29 18:09:41'),
(15, '2013/2014', 'First Term', 'JSS 3A', 'Completed', 'x8AzrCmgpKfYwEce', 'vivian', '10/09/2022 11:04:13', '2022-09-10 10:04:13', '2022-09-10 10:04:34'),
(16, '2011/2012', 'First Term', 'JSS 3A', 'Completed', 'x1WsnVOB9CoeKFhi', 'vivian', '10/09/2022 11:29:23', '2022-09-10 10:29:23', '2022-09-10 10:29:45');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `surname` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `other_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `st_age` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `st_password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lga` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_sch_attend` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_class_attend` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class_apply` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schooling_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `academic_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `school_category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `st_admin_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `st_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guardia_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guardia_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guardia_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guardia_address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staff_zone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staff_depart` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staff_rank` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `health_issue` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reg_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acct_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `staff_file_no` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acct_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `surname`, `other_name`, `sex`, `dob`, `st_age`, `state`, `st_password`, `lga`, `country`, `last_sch_attend`, `last_class_attend`, `class_apply`, `schooling_type`, `academic_year`, `school_category`, `st_admin_number`, `st_image`, `guardia_name`, `guardia_email`, `guardia_number`, `guardia_address`, `staff_zone`, `staff_depart`, `staff_rank`, `health_issue`, `reg_date`, `acct_status`, `staff_file_no`, `acct_action`, `created_at`, `updated_at`) VALUES
(1, 'rgerferf', 'rgergerg', 'Male', '2022-09-05', NULL, NULL, NULL, NULL, 'gbdfgber', 'wefwef', 'rgw', '7', 'Boarding', '6', '2', '4356345432', NULL, 'rgerg', 'wgfwgw@gmail.com', '0987354', 'fvsfdvdcvw', 'erwe', 'IT', 'Staff', NULL, '03/08/2022 11:12:43', 'Deleted', '', 'Ken220', '2022-08-03 10:12:43', '2022-08-03 12:45:10'),
(2, 'gbfgbgb', 'fdfvsvs', 'Female', '2022-08-16', NULL, 'Borno', NULL, NULL, 'dfbfvs', 'svsdvsd', 'vsdvsd', '6', 'Boarding', '7', '2', 'CS/30303', NULL, 'werfwerfwr', 'sdfvsdcv', '32523525', 'sdcasxc', 'Benin', 'Staff', 'Operator', 'No', '03/08/2022 11:17:40', 'Active', '20202', 'Ken220', '2022-08-03 10:17:40', '2022-08-24 20:51:19'),
(3, 'Uwadia', 'Ken Developer', 'Male', '2022-08-23', NULL, 'Benue', '$2y$10$B2gqJaiTvaCZM68ozvpZnO1zbqikDfGcv3K65jHa1ejkqye0r9qn2', NULL, 'Nigeria', 'ICC', 'Upper Class', '6', 'Day', '7', '2', 'ICC/90998/09', 'uploads/student_image/1659557828.jpg', 'Uwadia', 'ken@gmail.com', '08037250238', 'Benin Road, Lagos', 'Lagos', 'Admin', 'Level 12', NULL, '03/08/2022 13:43:47', 'Active', '20937', 'Ken220', '2022-08-03 12:43:47', '2022-09-12 10:38:22'),
(4, 'rgerg', 'regerg', 'Female', '2022-09-05', '12 Years', 'AkwaIbom', NULL, NULL, 'wrgweg', 'regrd', 'ggwegew', '6', 'Boarding', '6', '2', 'wewewe333', NULL, 'wergweg', 'wegwegew', 'wefwef', 'wefwefe', 'wewegw', 'gwgqegw', 'wegweg', 'Others', '03/08/2022 14:47:31', 'Active', '22352', 'Ken220', '2022-08-03 13:47:31', '2022-08-24 20:51:19'),
(5, 'Peter', 'Uwadia', 'Male', '2002-09-18', '7 Years', 'Adamawa', '$2y$10$oGusKK9vKdHAry1XuJsEn.HDQT.3F4ZeXPZYGq3C0RiJ2J99NuRRW', NULL, 'Nigeria', 'White School', 'JSS 2', '7', 'Day', '6', '1', 'SS/P/2022', 'uploads/student_image/1659557828.jpg', 'Uwadia', 'uwas@gmail.com', '08037250987', 'Royal Estate, by Askamaya Hotel, Ikota Road', 'Lagos', 'IT', 'Head of Department', 'No', '12/09/2022 12:31:02', 'Active', '20221', 'Ken220', '2022-09-12 11:31:02', '2022-09-12 11:35:53');

-- --------------------------------------------------------

--
-- Table structure for table `student_comments`
--

CREATE TABLE `student_comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comm_stu_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_stu_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_prin_comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_teacher` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comm_tid` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_comments`
--

INSERT INTO `student_comments` (`id`, `comm_stu_number`, `comm_stu_name`, `comm_class`, `comm_year`, `comm_term`, `comm_comment`, `comm_prin_comment`, `comm_teacher`, `comm_status`, `comm_addby`, `comm_date`, `comm_tid`, `created_at`, `updated_at`) VALUES
(20, 'CS/30303', 'fdfvsvs', 'JSS 3A', '2013/2014', 'Third Term', 'He is always listening', 'Principal', NULL, 'Deleted', 'Ken220', '01/09/2022 18:38:22', 'Eq0HcUJLsA6M4ojN', '2022-09-01 17:38:22', '2022-09-01 17:54:30'),
(21, 'ICC/90998/09', 'Ken Developer', 'JSS 3A', '2013/2014', 'Third Term', 'Very intelligent', 'Principal', NULL, 'Deleted', 'Ken220', '01/09/2022 18:38:22', 'Eq0HcUJLsA6M4ojN', '2022-09-01 17:38:22', '2022-09-01 17:54:30'),
(22, 'wewewe333', 'regerg', 'JSS 3A', '2013/2014', 'Third Term', 'Best student of the session', 'Principal', NULL, 'Deleted', 'Ken220', '01/09/2022 18:38:22', 'Eq0HcUJLsA6M4ojN', '2022-09-01 17:38:22', '2022-09-01 17:54:30'),
(32, 'CS/30303', 'fdfvsvs', 'JSS 3A', '2013/2014', 'Third Term', 'Good result', 'Principal', NULL, 'Active', 'vivian', '02/09/2022 19:10:20', 'SjAuhV2ZDFP3Or5C', '2022-09-02 18:10:20', '2022-09-02 18:10:20'),
(33, 'ICC/90998/09', 'Ken Developer', 'JSS 3A', '2013/2014', 'Third Term', 'Great performace', 'Principal', NULL, 'Active', 'vivian', '02/09/2022 19:10:20', 'SjAuhV2ZDFP3Or5C', '2022-09-02 18:10:20', '2022-09-02 18:10:20'),
(34, 'wewewe333', 'regerg', 'JSS 3A', '2013/2014', 'Third Term', 'Nice job', 'Principal', NULL, 'Active', 'vivian', '02/09/2022 19:10:20', 'SjAuhV2ZDFP3Or5C', '2022-09-02 18:10:20', '2022-09-02 18:10:20'),
(37, 'SS/P/2022', 'Ken Developer', 'JSS 3A', '2011/2012', 'First Term', 'Like reading', 'Principal', NULL, 'Active', 'vivian', '10/09/2022 12:34:03', 'AMzeW1tpghPGO4Zr', '2022-09-10 11:34:03', '2022-09-10 11:34:03'),
(38, 'SS/P/2022', 'regerg', 'JSS 3A', '2011/2012', 'First Term', 'Always alert jkjkjk', 'Teacher', 'Teacher', 'Active', 'vivian', '10/09/2022 12:34:03', 'AMzeW1tpghPGO4Zr', '2022-09-10 11:34:03', '2022-09-10 11:45:00'),
(40, 'CS/30303', 'fdfvsvs', 'JSS 3A', '2013/2014', 'First Term', 'qefqef', 'Principal', NULL, 'Active', 'vivian', '10/09/2022 13:14:10', 'VMl1f7NX5UWcOnEY', '2022-09-10 12:14:10', '2022-09-10 12:14:10'),
(41, 'ICC/90998/09', 'Ken Developer', 'JSS 3A', '2013/2014', 'First Term', 'qewqfq', 'Principal', NULL, 'Active', 'vivian', '10/09/2022 13:14:10', 'VMl1f7NX5UWcOnEY', '2022-09-10 12:14:10', '2022-09-10 12:14:10'),
(42, 'wewewe333', 'regerg', 'JSS 3A', '2013/2014', 'First Term', 'qfqqfwqf', 'Principal', NULL, 'Active', 'vivian', '10/09/2022 13:14:10', 'VMl1f7NX5UWcOnEY', '2022-09-10 12:14:10', '2022-09-10 12:14:10');

-- --------------------------------------------------------

--
-- Table structure for table `student_positions`
--

CREATE TABLE `student_positions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sch_year` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_term` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_class` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stu_admin_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tca_score` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exam_score` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total_score` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class_total` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `student_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `p_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `p_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_positions`
--

INSERT INTO `student_positions` (`id`, `sch_year`, `sch_term`, `sch_class`, `sch_category`, `stu_admin_number`, `tca_score`, `exam_score`, `total_score`, `class_total`, `user_code`, `position`, `add_by`, `student_name`, `p_date`, `p_status`, `created_at`, `updated_at`) VALUES
(89, '5', '7', '6', '1', 'CS/30303', '28', '44', '72', NULL, 'cwspBNj9S8M1R0fh', '1', 'Ken220', 'fdfvsvs', '19/08/2022 10:14:08', 'Deleted', '2022-08-19 09:14:08', '2022-09-01 14:10:34'),
(90, '6', '7', '6', '1', 'wewewe333', '4', '38', '72', NULL, 'cwspBNj9S8M1R0fh', '1', 'Ken220', 'regerg', '19/08/2022 10:14:08', 'Deleted', '2022-08-19 09:14:08', '2022-09-01 14:10:34'),
(91, '6', '7', '6', '1', 'ICC/90998/10', '27', '38', '65', NULL, 'cwspBNj9S8M1R0fh', '3', 'Ken220', 'Daniel Joe', '19/08/2022 10:14:08', 'Deleted', '2022-08-19 09:14:08', '2022-09-01 14:10:34'),
(92, '6', '7', '6', '1', 'ICC/90998/09', '4', '45', '49', NULL, 'cwspBNj9S8M1R0fh', '4', 'Ken220', 'Ken Developer', '19/08/2022 10:14:08', 'Deleted', '2022-08-19 09:14:08', '2022-09-01 14:10:34'),
(93, '5', '7', '6', '1', 'SS/P/2022', '27', '55', '82', NULL, 'CWyP6BTMOINblRcm', '1', 'Ken220', 'Ken Developer', '31/08/2022 14:36:59', 'Active', '2022-08-31 13:36:59', '2022-09-02 19:22:25'),
(94, '7', '7', '6', '1', 'wewewe333', '29', '34', '63', NULL, 'CWyP6BTMOINblRcm', '2', 'Ken220', 'regerg', '31/08/2022 14:36:59', 'Active', '2022-08-31 13:36:59', '2022-09-02 19:22:25'),
(95, '7', '7', '6', '1', 'CS/30303', '25', '35', '60', NULL, 'CWyP6BTMOINblRcm', '3', 'Ken220', 'fdfvsvs', '31/08/2022 14:36:59', 'Active', '2022-08-31 13:36:59', '2022-09-02 19:22:25');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `subject_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_addedby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subject_name`, `sub_addedby`, `sub_status`, `action`, `sub_date`, `created_at`, `updated_at`) VALUES
(1, 'Math', 'Ken Young', 'Deleted', NULL, '29/07/2022 16:50:49', '2022-07-29 15:50:49', '2022-08-29 18:48:57'),
(2, 'maths', 'Ken Young', 'Deleted', NULL, '29/07/2022 16:51:15', '2022-07-29 15:51:15', '2022-07-29 16:01:26'),
(3, 'English Language', 'Ken Young', 'Active', NULL, '29/07/2022 16:51:28', '2022-07-29 15:51:28', '2022-07-30 09:01:23'),
(4, 'Physic Updated', 'Ken Young', 'Deleted', NULL, '29/07/2022 16:51:36', '2022-07-29 15:51:36', '2022-08-29 18:45:06'),
(5, 'Chemistry Updated', 'Ken Young', 'Deleted', NULL, '29/07/2022 16:51:47', '2022-07-29 15:51:47', '2022-08-29 18:44:42'),
(6, 'Socialogy', 'Ken Young', 'Active', NULL, '29/07/2022 16:51:58', '2022-07-29 15:51:58', '2022-07-29 15:51:58'),
(7, 'Biology Science', 'Ken Young', 'Active', NULL, '29/07/2022 16:53:27', '2022-07-29 15:53:27', '2022-07-29 15:53:27'),
(8, 'Economics', 'Ken Young', 'Active', NULL, '29/07/2022 16:53:55', '2022-07-29 15:53:55', '2022-08-29 18:47:48'),
(9, 'Art 2', 'Ken Young', 'Deleted', NULL, '31/07/2022 20:17:37', '2022-07-31 19:17:37', '2022-07-31 19:17:49'),
(10, 'Art', 'Ken Young', 'Deleted', NULL, '29/08/2022 19:44:11', '2022-08-29 18:44:11', '2022-08-29 18:48:12'),
(11, 'Chemistry', 'Ken Young', 'Active', NULL, '29/08/2022 19:44:24', '2022-08-29 18:44:24', '2022-08-29 18:44:24'),
(12, 'Music', 'Ken Young', 'Active', NULL, '29/08/2022 19:44:33', '2022-08-29 18:44:33', '2022-08-29 18:44:33'),
(13, 'Writing', 'Ken Young', 'Active', NULL, '29/08/2022 19:49:14', '2022-08-29 18:49:14', '2022-08-29 18:49:14'),
(14, 'Physic', 'Ken Young', 'Active', NULL, '01/09/2022 16:23:26', '2022-09-01 15:23:26', '2022-09-01 15:23:26'),
(15, 'Accounting', 'Ken Young', 'Deleted', NULL, '01/09/2022 16:23:41', '2022-09-01 15:23:41', '2022-09-09 17:58:59');

-- --------------------------------------------------------

--
-- Table structure for table `submit_assignments`
--

CREATE TABLE `submit_assignments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `assign_id` bigint(20) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `teacher_id` int(20) DEFAULT NULL,
  `assign_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_file_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_message` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_scores` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_remark` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_submit_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_updated_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_file_path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assign_submit_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `submit_assignments`
--

INSERT INTO `submit_assignments` (`id`, `assign_id`, `student_id`, `teacher_id`, `assign_code`, `assign_file_name`, `assign_message`, `assign_scores`, `assign_remark`, `assign_status`, `assign_submit_date`, `assign_updated_date`, `assign_file_path`, `assign_submit_code`, `created_at`, `updated_at`) VALUES
(1, 5, 5, 5, 'jxlBmw3YXP1sZbWJ', '1663086301.jpg', 'Hellow sir, here is my assignment', '', '', '', '13/09/2022 16:25:01', '', 'uploads/assignment_folder/1663086301.jpg', 'twqIYK7heEVCBH4O', '2022-09-13 15:25:01', '2022-09-13 15:25:01'),
(2, 3, 5, 5, 'm8UV62peQyKjoIZg', NULL, 'bvkuhiuwdkjcbsdc', '', '', '', '13/09/2022 16:44:00', '', NULL, 'keFI40GyPfJAuRTS', '2022-09-13 15:44:00', '2022-09-13 15:44:00'),
(3, 5, 5, 5, 'jxlBmw3YXP1sZbWJ', NULL, 'swswe', '50', 'Thank you for the assignment! Very good', 'Successful', '13/09/2022 16:45:52', '14/09/2022 09:29:30', NULL, 'HXWquOMEgTJ5IeUZ', '2022-09-13 15:45:52', '2022-09-14 08:29:30'),
(4, 5, 5, 5, 'jxlBmw3YXP1sZbWJ', NULL, 'dfvfsdv', '', '', '', '13/09/2022 16:52:57', '', NULL, 'c0hj9FOoV6sK5f1y', '2022-09-13 15:52:57', '2022-09-13 15:52:57'),
(5, 3, 5, NULL, 'm8UV62peQyKjoIZg', NULL, 'ddaasc', '', '', '', '13/09/2022 16:54:15', '', NULL, 'UInJ1DGLvSds2Prz', '2022-09-13 15:54:15', '2022-09-13 15:54:15'),
(6, 3, 5, NULL, 'm8UV62peQyKjoIZg', NULL, 'svfvsv', '', '', '', '13/09/2022 17:20:29', '', NULL, '8aX3drfznj6liUSC', '2022-09-13 16:20:29', '2022-09-13 16:20:29'),
(7, 5, 5, NULL, 'jxlBmw3YXP1sZbWJ', NULL, 'jkbjknjk', '', '', '', '13/09/2022 17:28:08', '', NULL, 'UV4SIv7czdQpD1Fl', '2022-09-13 16:28:08', '2022-09-13 16:28:08'),
(8, 5, 5, 5, 'jxlBmw3YXP1sZbWJ', '1663090828.png', 'sfvsvsd', '30', 'Sorry, you need to re-write this assignment again thank you', 'Reject', '13/09/2022 17:40:28', '14/09/2022 09:31:47', 'uploads/assignment_folder/1663090828.png', '0VU3hz8aSIGxOfNe', '2022-09-13 16:40:28', '2022-09-14 08:31:47'),
(9, 3, 5, 5, 'm8UV62peQyKjoIZg', '1663091632.png', 'ytjtyjtdjyjtyjtdy', '12', 'Sorry', 'Reject', '13/09/2022 17:53:52', '14/09/2022 09:32:51', 'uploads/assignment_folder/1663091632.png', 'fvNX4wZ09q36SYum', '2022-09-13 16:53:52', '2022-09-14 08:32:51'),
(10, 5, 5, 5, 'jxlBmw3YXP1sZbWJ', '1663150636.jpg', 'Good job', '', '', 'Submitted', '14/09/2022 10:17:16', '', 'http://localhost:8000/uploads/assignment_folder/1663150636.jpg', '3xVtwhzDv5pfaoQH', '2022-09-14 09:17:16', '2022-09-14 09:17:16');

-- --------------------------------------------------------

--
-- Table structure for table `system_setups`
--

CREATE TABLE `system_setups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sch_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_name_short` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_logo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_banner` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_favicon` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sch_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `app_state` tinyint(1) NOT NULL DEFAULT 0,
  `app_student_section` tinyint(1) NOT NULL DEFAULT 0,
  `app_staff_section` tinyint(1) NOT NULL DEFAULT 0,
  `app_admin_section` tinyint(1) NOT NULL DEFAULT 0,
  `addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `app_status` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `app_student_portal` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `system_setups`
--

INSERT INTO `system_setups` (`id`, `sch_name`, `sch_name_short`, `sch_phone`, `sch_email`, `sch_logo`, `sch_banner`, `sch_favicon`, `sch_action`, `app_state`, `app_student_section`, `app_staff_section`, `app_admin_section`, `addby`, `add_date`, `app_status`, `app_student_portal`, `created_at`, `updated_at`) VALUES
(6, 'LiftSoft International Education Center.', 'LiftSoft Edu', '+2348037250238', 'support@liftsoft.com', 'uploads/images_folder/1663446226.png', 'uploads/images_folder/1663442388.png', NULL, NULL, 0, 0, 0, 0, 'Ken220', '17/09/2022 20:25:04', 'Active', 'Active', '2022-09-17 18:13:18', '2022-09-17 19:25:04');

-- --------------------------------------------------------

--
-- Table structure for table `term_models`
--

CREATE TABLE `term_models` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `term_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `add_by` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `term_models`
--

INSERT INTO `term_models` (`id`, `term_name`, `add_by`, `t_status`, `t_date`, `t_action`, `created_at`, `updated_at`) VALUES
(1, 'First Term 22', 'Ken220', 'Deleted', '30/07/2022 16:14:46', NULL, '2022-07-30 15:14:46', '2022-07-30 15:47:30'),
(2, 'Second Term', 'Ken220', 'Deleted', '30/07/2022 16:37:57', NULL, '2022-07-30 15:37:57', '2022-07-30 15:47:34'),
(3, 'Third Term', 'Ken220', 'Deleted', '30/07/2022 16:38:04', NULL, '2022-07-30 15:38:04', '2022-07-30 15:47:41'),
(4, 'First Term', 'Ken220', 'Deleted', '30/07/2022 16:57:14', NULL, '2022-07-30 15:57:14', '2022-07-30 16:03:37'),
(5, 'First Term', 'Ken220', 'Deleted', '30/07/2022 17:04:36', NULL, '2022-07-30 16:04:36', '2022-07-30 16:04:54'),
(6, 'Third Term', 'Ken220', 'Deleted', '30/07/2022 17:04:43', NULL, '2022-07-30 16:04:43', '2022-07-30 16:04:55'),
(7, 'First Term', 'Ken220', 'Active', '31/07/2022 14:29:49', NULL, '2022-07-31 13:29:49', '2022-07-31 13:29:49'),
(8, 'Third Term', 'Ken220', 'Active', '31/07/2022 14:29:58', NULL, '2022-07-31 13:29:58', '2022-07-31 13:29:58');

-- --------------------------------------------------------

--
-- Table structure for table `test_records`
--

CREATE TABLE `test_records` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `record_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qty` bigint(20) DEFAULT NULL,
  `unit_price` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purch_price` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `selling_price` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `total` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addby` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rec_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rec_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `test_saves`
--

CREATE TABLE `test_saves` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state_details` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class_details` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message_details` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tran_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reg_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `test_saves`
--

INSERT INTO `test_saves` (`id`, `email`, `state_details`, `class_details`, `message_details`, `tran_code`, `status`, `reg_date`, `created_at`, `updated_at`) VALUES
(46, NULL, 'Abia, AkwaIbom, Bauchi, Benue, CrossRivers', '6, 8, 9', 'Thanks you', 'ntK5Oi47epcyUaIQ', 'Pending', NULL, '2022-09-03 21:33:47', '2022-09-03 21:33:47'),
(56, NULL, 'Kogi, Kaduna, Ogun, Rivers, Zamfara', '5, 8, 9, 11', 'Good job! You try. keep it up', 'MmXKIPpJbfSn5HEu', 'Pending', '03/09/2022 22:37:04', '2022-09-03 21:37:04', '2022-09-03 21:37:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mpcode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acct_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reg_status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `occupation` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reg_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'User',
  `staff_id` int(20) DEFAULT NULL,
  `student_id` int(20) DEFAULT NULL,
  `user_logg_status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `sex`, `state`, `location`, `address`, `username`, `dob`, `mpcode`, `acct_status`, `reg_status`, `occupation`, `reg_date`, `photo`, `role`, `staff_id`, `student_id`, `user_logg_status`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Ken Young', 'ken@gmail.com', '08037250238', NULL, NULL, NULL, NULL, 'Ken220', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Admin', NULL, NULL, 'Authenticated', NULL, '$2y$10$0nqm9txF1BII.lghYyo0.u30BS8B4RefXRRHsSG1d7gBozSC.jM0m', NULL, '2022-07-27 14:35:26', '2022-09-24 18:37:59'),
(2, 'Jerry Perry', 'jerry@gmail.com', '08037250238', NULL, NULL, NULL, NULL, 'Perry30', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Teacher', NULL, NULL, NULL, NULL, '$2y$10$.bHp3HDsWpbrIjGV4jPHC.zh8tdcQsoo/0P3X9KkgPc7rdklWyNz6', NULL, '2022-09-04 13:01:20', '2022-09-07 16:06:35'),
(5, 'Uwadia Vivian', 'vivian@gmail.com', '08037250237', 'Female', 'Abia', 'Nigeria', 'New Road, Lagos', 'vivian', '2022-09-20', NULL, 'Active', 'Active', NULL, '06/09/2022 16:56:39', NULL, 'Teacher', 5, NULL, '', NULL, '$2y$10$gHqhTW7vrF9Jus2H6HZP9efVLTH9HiKEWzZxx.ytvgioFs4tj87fC', NULL, '2022-09-06 15:56:39', '2022-09-24 13:51:08'),
(6, 'Perry Smith', 'smith@gmail.com', '090372502388', 'Male', NULL, NULL, NULL, 'ICC/90998/09', NULL, NULL, 'Active', 'Active', NULL, NULL, NULL, 'Student', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL),
(7, 'Peter Uwadia', 'uwas@gmail.com', '08037250987', NULL, NULL, NULL, NULL, 'SS/P/2022', NULL, NULL, 'Active', NULL, NULL, '12/09/2022 12:37:17', NULL, 'Student', NULL, 5, '', NULL, '$2y$10$/51oOB8f.t66c7RjL0ad3.Tp8Yb7.0vaOnQ53m5vG3CR.5ZiaH3EG', NULL, '2022-09-12 11:37:17', '2022-09-24 18:28:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_sessions`
--
ALTER TABLE `academic_sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activitity_logs`
--
ALTER TABLE `activitity_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `application_notifications`
--
ALTER TABLE `application_notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assigned_subjects`
--
ALTER TABLE `assigned_subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assign_classes`
--
ALTER TABLE `assign_classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_models`
--
ALTER TABLE `class_models`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `current_sessions`
--
ALTER TABLE `current_sessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `c_a_result_process_starts`
--
ALTER TABLE `c_a_result_process_starts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `days_school_opens`
--
ALTER TABLE `days_school_opens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `finance_reports`
--
ALTER TABLE `finance_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generate_pins`
--
ALTER TABLE `generate_pins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `graduations`
--
ALTER TABLE `graduations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_statuses`
--
ALTER TABLE `login_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message_systems`
--
ALTER TABLE `message_systems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `process_gradings`
--
ALTER TABLE `process_gradings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `psychomoto_domians`
--
ALTER TABLE `psychomoto_domians`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `result_c_a_s`
--
ALTER TABLE `result_c_a_s`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `result_process_starts`
--
ALTER TABLE `result_process_starts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `result_saves`
--
ALTER TABLE `result_saves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `result_tables`
--
ALTER TABLE `result_tables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `result_view_checks`
--
ALTER TABLE `result_view_checks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_categories`
--
ALTER TABLE `school_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_resumptions`
--
ALTER TABLE `school_resumptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `start_attendances`
--
ALTER TABLE `start_attendances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `start_graduations`
--
ALTER TABLE `start_graduations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `start_promotions`
--
ALTER TABLE `start_promotions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `start_psychomoto_domains`
--
ALTER TABLE `start_psychomoto_domains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_comments`
--
ALTER TABLE `student_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_positions`
--
ALTER TABLE `student_positions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submit_assignments`
--
ALTER TABLE `submit_assignments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system_setups`
--
ALTER TABLE `system_setups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `term_models`
--
ALTER TABLE `term_models`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_records`
--
ALTER TABLE `test_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test_saves`
--
ALTER TABLE `test_saves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_sessions`
--
ALTER TABLE `academic_sessions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `activitity_logs`
--
ALTER TABLE `activitity_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `application_notifications`
--
ALTER TABLE `application_notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assigned_subjects`
--
ALTER TABLE `assigned_subjects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `assign_classes`
--
ALTER TABLE `assign_classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `attendances`
--
ALTER TABLE `attendances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `class_models`
--
ALTER TABLE `class_models`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `current_sessions`
--
ALTER TABLE `current_sessions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `c_a_result_process_starts`
--
ALTER TABLE `c_a_result_process_starts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `days_school_opens`
--
ALTER TABLE `days_school_opens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `finance_reports`
--
ALTER TABLE `finance_reports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `generate_pins`
--
ALTER TABLE `generate_pins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;

--
-- AUTO_INCREMENT for table `graduations`
--
ALTER TABLE `graduations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `login_statuses`
--
ALTER TABLE `login_statuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=303;

--
-- AUTO_INCREMENT for table `message_systems`
--
ALTER TABLE `message_systems`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=406;

--
-- AUTO_INCREMENT for table `process_gradings`
--
ALTER TABLE `process_gradings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `psychomoto_domians`
--
ALTER TABLE `psychomoto_domians`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `result_c_a_s`
--
ALTER TABLE `result_c_a_s`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `result_process_starts`
--
ALTER TABLE `result_process_starts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT for table `result_saves`
--
ALTER TABLE `result_saves`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `result_tables`
--
ALTER TABLE `result_tables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=294;

--
-- AUTO_INCREMENT for table `result_view_checks`
--
ALTER TABLE `result_view_checks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `school_categories`
--
ALTER TABLE `school_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `school_resumptions`
--
ALTER TABLE `school_resumptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `start_attendances`
--
ALTER TABLE `start_attendances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `start_graduations`
--
ALTER TABLE `start_graduations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `start_promotions`
--
ALTER TABLE `start_promotions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `start_psychomoto_domains`
--
ALTER TABLE `start_psychomoto_domains`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_comments`
--
ALTER TABLE `student_comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `student_positions`
--
ALTER TABLE `student_positions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `submit_assignments`
--
ALTER TABLE `submit_assignments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `system_setups`
--
ALTER TABLE `system_setups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `term_models`
--
ALTER TABLE `term_models`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `test_records`
--
ALTER TABLE `test_records`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `test_saves`
--
ALTER TABLE `test_saves`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
