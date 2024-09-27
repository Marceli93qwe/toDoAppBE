-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 22 Gru 2023, 12:02
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `to_do_app`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` varchar(36) NOT NULL,
  `bookmarkName` varchar(20) DEFAULT NULL,
  `userId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `bookmarkName`, `userId`) VALUES
('213ae413-b9bd-46af-8da4-1f4553729396', 'Dom', '458bc1ae-5475-46c0-bba1-b68cdf262665'),
('3554b458-2972-4be9-9f58-75b9102a9589', 'Zawody Spoto', 'de81f07b-b7ec-4b97-9464-f000175b48de'),
('480928c5-684c-4c28-aec9-73ec69c17a21', 'Szkoła', '0f5e7d8b-0422-481f-b43b-2bda04129230'),
('4bc87f3a-2f76-4567-9192-2ec5f4c0a84e', 'Jajco', '31745583-90c1-4632-8ecd-818171e7e2bb'),
('4d130609-9232-41ee-8d7f-db49d02e5684', 'Dom', '0f5e7d8b-0422-481f-b43b-2bda04129230'),
('6ca04825-153a-4509-b009-1ba2f64dd064', 'Zawody Spoto', '31745583-90c1-4632-8ecd-818171e7e2bb'),
('6da00c1b-0777-435e-b4ce-bd6eaf1d1141', 'Dom', 'a496dc97-fb1b-4427-bd72-b5789bb1caf9'),
('70f657c9-fb00-453f-a68a-4a0748e10a2f', 'Szkoła', '0f5e7d8b-0422-481f-b43b-2bda04129230'),
('9461237d-b537-4579-b348-dfd0170a8b73', 'Dom', 'a496dc97-fb1b-4427-bd72-b5789bb1caf9'),
('9927af5a-4167-45a7-9c1f-b689c97b17fa', 'Dom', '31745583-90c1-4632-8ecd-818171e7e2bb'),
('9ba842e1-6707-450a-bb6c-eba3c0d10844', 'Szkoła', 'a496dc97-fb1b-4427-bd72-b5789bb1caf9'),
('a4edb245-1a1e-46a2-bfa9-58b61d6b99d9', 'Dom', '0f5e7d8b-0422-481f-b43b-2bda04129230'),
('c6d15100-66a7-49fc-aa68-10b0474fb849', 'Praca', 'a496dc97-fb1b-4427-bd72-b5789bb1caf9'),
('dd39e432-ff79-4999-8f3f-f009db318a31', 'Dom', '0f5e7d8b-0422-481f-b43b-2bda04129230'),
('f01064f3-26f0-4b82-a742-2cbc36460e12', 'Praca', 'a496dc97-fb1b-4427-bd72-b5789bb1caf9'),
('fb47509c-05af-406f-8d41-90c176d6aa96', 'Dom', '0f5e7d8b-0422-481f-b43b-2bda04129230');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `subtasks`
--

CREATE TABLE `subtasks` (
  `id` varchar(36) NOT NULL,
  `subtaskName` varchar(50) DEFAULT NULL,
  `taskId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `subtasks`
--

INSERT INTO `subtasks` (`id`, `subtaskName`, `taskId`) VALUES
('2c87751d-5bcf-4595-9ed3-818aa6786fca', 'tescior 2115', '46328d44-8499-4d09-8138-f5d209bd8956'),
('5efc706e-faeb-4d0c-b28a-62ecf5527b20', 'tescior 2115', '0e41a1d6-511d-4dfb-97c6-ff56aa9bbf15');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tasks`
--

CREATE TABLE `tasks` (
  `id` varchar(36) NOT NULL,
  `taskName` varchar(36) DEFAULT NULL,
  `bookmarkId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `tasks`
--

INSERT INTO `tasks` (`id`, `taskName`, `bookmarkId`) VALUES
('0e41a1d6-511d-4dfb-97c6-ff56aa9bbf15', 'Kupić karnet na siłownię i pojechać ', '213ae413-b9bd-46af-8da4-1f4553729396'),
('2db95845-b1b0-4dea-bee4-6f1a8b6cadd2', 'Pojechać w góry', '480928c5-684c-4c28-aec9-73ec69c17a21'),
('341e60f2-9977-49df-88e3-4c17fab81b84', 'Zrobić zadanie domowe na matme', '480928c5-684c-4c28-aec9-73ec69c17a21'),
('46328d44-8499-4d09-8138-f5d209bd8956', 'Kupić karnet na siłownię i pojechać ', 'fb47509c-05af-406f-8d41-90c176d6aa96'),
('4821dc97-30e0-45a6-bdcd-724332766cdd', 'Zrobić zadanie domowe na matme', '480928c5-684c-4c28-aec9-73ec69c17a21'),
('92a53ac8-82eb-42c2-bc25-20b6505a4223', 'Kupić karnet na siłownię i pojechać ', '4bc87f3a-2f76-4567-9192-2ec5f4c0a84e'),
('9f1b0c28-0ab3-40d6-9937-1f0d976d5bb2', 'Zrobić zakupy', '480928c5-684c-4c28-aec9-73ec69c17a21'),
('ffe6b2d6-8b76-4637-9331-e8ff2484df87', 'Kupić karnet na siłownię i pojechać ', '3554b458-2972-4be9-9f58-75b9102a9589');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
('0f5e7d8b-0422-481f-b43b-2bda04129230', 'Marcelek1', 'mercelmandrok8@gmail.com', '$2b$10$8eUo9wLX7AGdOPVSjppKr.NI2jMyFwffSq.UmkxTegLPWv6WSt7EG'),
('31745583-90c1-4632-8ecd-818171e7e2bb', 'Marcelek1', 'mercelmandrok@gmail.com', '$2b$10$AhrQLy1.a1leTn/R.s4J3e8QxJvTj4kpZge7fYyyjst.W72Onti86'),
('458bc1ae-5475-46c0-bba1-b68cdf262665', 'Marcelek1', 'mercelmandrok91@gmail.com', '$2b$10$9Jt3.1lvY2xbyJQUNkVsuejdykqsEtNimmE5oipci9bmMEuwY/U4a'),
('6a4baad3-2df5-4f74-bc70-0996ab75942d', 'Marceli', 'testowyda@gmail.com', '$2b$10$ZYppjJx.L3mj5vDzDrR5ouLC5criyja7lgsvPqJkFBrwkuSjqVhVm'),
('839ef3e8-914c-45f0-a9d1-05b9fdffd5b7', 'Marcelek1', 'mercelmandro3k@gmail.com', '$2b$10$ko9H52BjYbdcsL1NZ7KPO.RuClWWMcwPM780i7osI3BhknWJ9Jgky'),
('90fbed3a-4d96-41ec-8e6f-38f65f93e20c', 'Marcelek1', 'mercelmandro2k@gmail.com', '$2b$10$iO3N.kFG6jQjt/.w9HyeE.1ZFIahU4Pc6jxEGcZ6xKWRPfj2XhcZq'),
('a3d60578-c6ea-49d4-a56b-27b6596cbe57', 'Marcelek1', 'mercelmandrok28@gmail.com', '$2b$10$gYs0Qya3JRyNKxJCRT6ZCu82kkvT/9SeCQTI/6YSsi7/CAak3Dh8a'),
('a496dc97-fb1b-4427-bd72-b5789bb1caf9', 'Marcelek1', 'mercelmandrok9@gmail.com', '$2b$10$UVypH7QnokORlmZ7pxj8euNgoFg/4j/kDYIWzCiDLxTily93P.iWi'),
('b3f06677-ca5f-4a55-8ebc-145b2848552a', 'Marceli', 'testowyd@gmail.com', '$2b$10$9TahorZjyUs4fQMRsbxUw.P5wtG6YzxyHyVB8nWIE/CCFv5eRDfAm'),
('b9f7aa6d-3d69-4a4c-b0bd-141a8a31bf0a', 'Marcelek1', 'mercelmandro4k@gmail.com', '$2b$10$vjqcM.R30aaMPOTvBeB5AOS5q9IiMhA/OKCsxlDHTwbKhqjHsta0W'),
('de81f07b-b7ec-4b97-9464-f000175b48de', 'marcelSzpak', 'swiaty@interia.pl', '$2b$10$z6xoTEKWEEXluR9lkW/77uKLQkkszq/mu6XUGtwN2o9ADqqjhze42');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`userId`);

--
-- Indeksy dla tabeli `subtasks`
--
ALTER TABLE `subtasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `taskId` (`taskId`);

--
-- Indeksy dla tabeli `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookmark_id` (`bookmarkId`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ograniczenia dla tabeli `subtasks`
--
ALTER TABLE `subtasks`
  ADD CONSTRAINT `subtasks_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`) ON DELETE CASCADE;

--
-- Ograniczenia dla tabeli `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`bookmarkId`) REFERENCES `bookmarks` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
