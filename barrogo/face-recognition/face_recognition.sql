-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2022 at 08:33 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `face_recognition`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(255) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `uid`, `date_created`, `type`, `remarks`, `status`) VALUES
(1, '22-3IRHJ', '2022-04-07 11:52:55', 'TIME IN', NULL, 1),
(2, '22-3IRHJ', '2022-04-07 11:53:43', 'LUNCH IN', NULL, 1),
(3, '22-3IRHJ', '2022-04-07 11:54:01', 'LUNCH OUT', NULL, 1),
(4, '22-3IRHJ', '2022-04-07 11:54:15', 'TIME OUT', NULL, 1),
(5, '22-CGJL6', '2022-04-06 17:05:55', 'TIME IN', ' No Time in yesterday. No Lunch in yesterday. No Lunch out yesterday. No Time out yesterday.', 1),
(6, '22-CGJL6', '2022-04-07 17:30:22', 'TIME IN', ' No Lunch in yesterday. No Lunch out yesterday. No Time out yesterday.', 1),
(7, '22-CGJL6', '2022-04-07 17:36:13', 'TIME OUT', ' No lunch in. No lunch out.', 1),
(8, '22-CGJL6', '2022-04-08 10:54:15', 'TIME IN', ' No Lunch in yesterday. No Lunch out yesterday.', 1),
(9, '22-CGJL6', '2022-04-08 10:54:31', 'LUNCH OUT', ' No lunch in.', 1),
(10, '22-CGJL6', '2022-04-08 10:54:45', 'TIME OUT', ' No lunch in.', 1),
(11, '22-B1HEH', '2022-04-08 11:50:58', 'TIME IN', ' No Time in yesterday. No Lunch in yesterday. No Lunch out yesterday. No Time out yesterday.', 1),
(12, '22-B1HEH', '2022-04-11 11:50:58', 'TIME IN', NULL, 1),
(13, '22-CGJL6', '2022-04-11 18:35:54', 'TIME IN', NULL, 1),
(14, '22-CGJL6', '2022-04-12 09:30:58', 'TIME IN', ' No Lunch in yesterday. No Lunch out yesterday. No Time out yesterday.', 1),
(15, '22-CGJL6', '2022-04-12 15:14:01', 'TIME OUT', ' No lunch in. No lunch out.', 1),
(16, '22-B1HEH', '2022-04-12 16:58:27', 'TIME IN', ' No Lunch in yesterday. No Lunch out yesterday. No Time out yesterday.', 1),
(17, '22-GB7O5', '2022-04-12 17:32:39', 'LUNCH IN', ' No Time in.', 1),
(18, '22-XLVSH', '2022-04-12 17:33:52', 'TIME IN', ' No Time in yesterday. No Lunch in yesterday. No Lunch out yesterday. No Time out yesterday.', 1),
(19, '22-EASHA', '2022-04-12 17:34:21', 'TIME OUT', ' No Time in. No lunch in. No lunch out.', 1),
(20, '22-B1HEH', '2022-04-12 17:35:19', 'TIME OUT', ' No lunch in. No lunch out.', 1),
(21, '22-CGJL6', '2022-04-13 12:27:27', 'TIME IN', ' No Lunch in yesterday. No Lunch out yesterday.', 1),
(22, '22-CGJL6', '2022-04-13 12:35:23', 'LUNCH IN', NULL, 1),
(23, '22-CGJL6', '2022-04-18 10:30:36', 'TIME IN', NULL, 1),
(24, '22-CGJL6', '2022-04-18 10:30:50', 'LUNCH OUT', ' No lunch in.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(4) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uid`, `fullname`, `department`, `date_created`) VALUES
(1, '22-CGJL6', 'Raven Barrogo', 'I.T.', '2022-04-18 09:54:05'),
(2, '22-3IRHJ', 'Nadine Lancaster', 'Accounting', '2022-04-07 09:54:05'),
(3, '22-B1HEH', 'Ernanie Joseph', 'HR', '2022-04-12 09:54:05'),
(4, '22-GB7O5', 'Kyle Barrientos', 'I.T.', '2022-04-12 09:54:05'),
(5, '22-XLVSH', 'John Loid Bucton', 'Engineering', '2022-04-12 09:54:05'),
(6, '22-EASHA', 'Justin Mingoy', 'HR', '2022-04-12 09:54:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`uid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `fk_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
