-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2021 at 09:04 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentalapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE `calendar` (
  `id` int(11) NOT NULL,
  `type` tinytext COLLATE utf8mb4_bin NOT NULL,
  `datetime_from` datetime NOT NULL,
  `datetime_to` datetime NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `does_not_repeat` text COLLATE utf8mb4_bin NOT NULL,
  `place_of_meeting` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL,
  `participants` varchar(250) COLLATE utf8mb4_bin DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `details` text COLLATE utf8mb4_bin NOT NULL,
  `color` varchar(10) COLLATE utf8mb4_bin DEFAULT NULL,
  `url` varchar(250) COLLATE utf8mb4_bin DEFAULT NULL,
  `participants_role` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `participants_status` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `calendar`
--

INSERT INTO `calendar` (`id`, `type`, `datetime_from`, `datetime_to`, `title`, `does_not_repeat`, `place_of_meeting`, `related_to`, `participants`, `status`, `details`, `color`, `url`, `participants_role`, `participants_status`) VALUES
(1, 'Party', '2021-06-18 13:30:35', '2021-06-18 18:00:08', 'Event for lead company Best', 'Every monday', 'Venue 3, Showroom 5', 'lead: 2', '1,2,3', '1', 'Something here', '#CC7CCF', NULL, 'REQ-PARTICIPANT,OPT-PARTICIPANT,OPT-PARTICIPANT', 'REQUESTED,REQUESTED,REQUESTED'),
(2, 'Party', '2021-06-12 13:30:35', '2021-06-12 18:00:08', 'Event for lead company Best', 'Every monday', 'Venue 3, Showroom 5', 'lead: 1', '1,2', '1', 'Something here', '#fc4b3e', NULL, 'REQ-PARTICIPANT,OPT-PARTICIPANT', 'ACCEPTED,REQUESTED'),
(3, 'party', '2021-06-15 23:31:58', '2021-06-17 08:04:52', 'Test Event 03', '6:00', 'venue', NULL, '1', '1', 'details', '#f27f2d', NULL, 'REQ-PARTICIPANT', 'ACCEPTED'),
(4, 'Party', '2021-06-14 08:10:24', '2021-06-15 08:10:24', 'White Test', '9AM', 'veu', NULL, '2', '1', 'detailed', '#111315', NULL, 'REQ-PARTICIPANT', 'ACCEPTED'),
(5, 'Party', '2021-06-13 23:13:40', '2021-06-25 23:13:40', 'Stress Test', 'Monday', 'venue', NULL, '2', '1', 'details', '#7e79b5', NULL, 'REQ-PARTICIPANT', 'ACCEPTED');

-- --------------------------------------------------------

--
-- Table structure for table `calendar_contacts`
--

CREATE TABLE `calendar_contacts` (
  `id` int(11) NOT NULL,
  `calendarid` int(11) NOT NULL,
  `contactid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `calendar_contacts`
--

INSERT INTO `calendar_contacts` (`id`, `calendarid`, `contactid`) VALUES
(1, 1, 3),
(2, 1, 1),
(3, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `calendar_leads`
--

CREATE TABLE `calendar_leads` (
  `id` int(11) NOT NULL,
  `calendarid` int(11) NOT NULL,
  `leadid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `calendar_leads`
--

INSERT INTO `calendar_leads` (`id`, `calendarid`, `leadid`) VALUES
(1, 1, 2),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `fullname` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `contact_hours` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `active` int(11) NOT NULL,
  `primary_contact` int(11) DEFAULT NULL,
  `home_phone` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `secondary_email` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `fullname`, `phone`, `email`, `address`, `contact_hours`, `active`, `primary_contact`, `home_phone`, `secondary_email`) VALUES
(1, 'Nombre de Fantasia', '23912923489032', 'micorreo@gmail.com', 'Los saltos y brincos 344', 'From Monday to Sunday 8 am - 7 pm', 0, NULL, NULL, NULL),
(2, 'Some new lead', '1239818923983', 'lead_mail2@test.com', 'Some new address', 'From 04/24/2021 11:51 PM To 04/29/2021 11:51 PM', 1, NULL, NULL, NULL),
(3, 'Contact One', '398929230', 'mymail@mail.com', 'Street 210', 'From 8 AM to 5 PM', 1, 1, '929183089', 'mymail2@mail.com'),
(4, 'Contact Two', '1902320930123', 'my2212ail@mail.com', 'Street 310', 'From 9 AM to 6 PM', 1, 0, '929183089', 'mymail3@mail.com');

-- --------------------------------------------------------

--
-- Table structure for table `contracts`
--

CREATE TABLE `contracts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `date` date NOT NULL,
  `status` longtext COLLATE utf8mb4_bin NOT NULL,
  `destinatary` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `document_path` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `signed_date` datetime NOT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL,
  `html_content` longtext COLLATE utf8mb4_bin DEFAULT NULL,
  `img` varchar(250) COLLATE utf8mb4_bin NOT NULL,
  `sent_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `contracts`
--

INSERT INTO `contracts` (`id`, `title`, `date`, `status`, `destinatary`, `amount`, `document_path`, `signed_date`, `related_to`, `html_content`, `img`, `sent_date`) VALUES
(1, 'Week long event ID 24', '2021-03-30', 'Signed', 'testing@mail.com', '258', '/uploads/contracts/contract2399103.pdf', '2020-04-13 00:00:00', 'lead: 1', '<h1>Testing Contracts Saving</h1><p>Implementing HelloSign for this</p>', '/uploads/placeholder.jpg', '2021-02-13'),
(2, 'First Template of Contract', '2021-06-14', 'Template', '', '0', '/templates/contracts/template-contract-6-14-2021.html', '2021-06-15 04:24:26', NULL, '<h1>Template of Contract</h1>\r\n<p>Content of template</p>', '/uploads/placeholder.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `document_path` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `payment_status` tinyint(1) NOT NULL,
  `payment_date` datetime NOT NULL,
  `destinatary` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `due` date NOT NULL,
  `amount` decimal(20,6) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `html_content` longtext COLLATE utf8mb4_bin DEFAULT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL,
  `status` varchar(250) COLLATE utf8mb4_bin DEFAULT 'Draft',
  `img` varchar(250) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='payment_status';

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `title`, `document_path`, `payment_status`, `payment_date`, `destinatary`, `due`, `amount`, `created`, `html_content`, `related_to`, `status`, `img`) VALUES
(1, 'My Invoice 2021', 'invoice_2021.pdf', 0, '2021-03-12 00:00:00', 'client_0202', '2022-02-12', '120.400000', '2021-05-31 04:07:48', '<div class=\"invoice-box\">\r\n			<table>\r\n				<tr class=\"top\">\r\n					<td colspan=\"2\">\r\n						<table>\r\n							<tr>\r\n								<td class=\"title\">\r\n									<img src=\"./images/logo.png\" alt=\"Company logo\" style=\"width: 100%; max-width: 300px\" />\r\n								</td>\r\n\r\n								<td>\r\n									Invoice #: 123<br />\r\n									Created: January 1, 2015<br />\r\n									Due: February 1, 2015\r\n								</td>\r\n							</tr>\r\n						</table>\r\n					</td>\r\n				</tr>\r\n\r\n				<tr class=\"information\">\r\n					<td colspan=\"2\">\r\n						<table>\r\n							<tr>\r\n								<td>\r\n									Sparksuite, Inc.<br />\r\n									12345 Sunny Road<br />\r\n									Sunnyville, TX 12345\r\n								</td>\r\n\r\n								<td>\r\n									Acme Corp.<br />\r\n									John Doe<br />\r\n									john@example.com\r\n								</td>\r\n							</tr>\r\n						</table>\r\n					</td>\r\n				</tr>\r\n\r\n				<tr class=\"heading\">\r\n					<td>Payment Method</td>\r\n\r\n					<td>Check #</td>\r\n				</tr>\r\n\r\n				<tr class=\"details\">\r\n					<td>Check</td>\r\n\r\n					<td>1000</td>\r\n				</tr>\r\n\r\n				<tr class=\"heading\">\r\n					<td>Item</td>\r\n\r\n					<td>Price</td>\r\n				</tr>\r\n\r\n				<tr class=\"item\">\r\n					<td>Website design</td>\r\n\r\n					<td>$300.00</td>\r\n				</tr>\r\n\r\n				<tr class=\"item\">\r\n					<td>Hosting (3 months)</td>\r\n\r\n					<td>$75.00</td>\r\n				</tr>\r\n\r\n				<tr class=\"item last\">\r\n					<td>Domain name (1 year)</td>\r\n\r\n					<td>$10.00</td>\r\n				</tr>\r\n\r\n				<tr class=\"total\">\r\n					<td></td>\r\n\r\n					<td>Total: $385.00</td>\r\n				</tr>\r\n			</table>\r\n		</div>', '{leads: 1, contact: 1}', 'InProgress', NULL),
(2, 'My Invoice 2021', 'invoice_2021.pdf', 1, '2021-03-12 00:00:00', 'client_0202', '2022-02-12', '120.400000', '2021-05-31 04:07:53', '<div class=\"invoice-box\">\r\n			<table>\r\n				<tr class=\"top\">\r\n					<td colspan=\"2\">\r\n						<table>\r\n							<tr>\r\n								<td class=\"title\">\r\n									<img src=\"./images/logo.png\" alt=\"Company logo\" style=\"width: 100%; max-width: 300px\" />\r\n								</td>\r\n\r\n								<td>\r\n									Invoice #: 123<br />\r\n									Created: January 1, 2015<br />\r\n									Due: February 1, 2015\r\n								</td>\r\n							</tr>\r\n						</table>\r\n					</td>\r\n				</tr>\r\n\r\n				<tr class=\"information\">\r\n					<td colspan=\"2\">\r\n						<table>\r\n							<tr>\r\n								<td>\r\n									Sparksuite, Inc.<br />\r\n									12345 Sunny Road<br />\r\n									Sunnyville, TX 12345\r\n								</td>\r\n\r\n								<td>\r\n									Acme Corp.<br />\r\n									John Doe<br />\r\n									john@example.com\r\n								</td>\r\n							</tr>\r\n						</table>\r\n					</td>\r\n				</tr>\r\n\r\n				<tr class=\"heading\">\r\n					<td>Payment Method</td>\r\n\r\n					<td>Check #</td>\r\n				</tr>\r\n\r\n				<tr class=\"details\">\r\n					<td>Check</td>\r\n\r\n					<td>1000</td>\r\n				</tr>\r\n\r\n				<tr class=\"heading\">\r\n					<td>Item</td>\r\n\r\n					<td>Price</td>\r\n				</tr>\r\n\r\n				<tr class=\"item\">\r\n					<td>Website design</td>\r\n\r\n					<td>$300.00</td>\r\n				</tr>\r\n\r\n				<tr class=\"item\">\r\n					<td>Hosting (3 months)</td>\r\n\r\n					<td>$75.00</td>\r\n				</tr>\r\n\r\n				<tr class=\"item last\">\r\n					<td>Domain name (1 year)</td>\r\n\r\n					<td>$10.00</td>\r\n				</tr>\r\n\r\n				<tr class=\"total\">\r\n					<td></td>\r\n\r\n					<td>Total: $385.00</td>\r\n				</tr>\r\n			</table>\r\n		</div>', '{leads: 2, contact: 2}', 'InProgress', NULL),
(3, 'My Invoice 2021', 'invoice_2021.pdf', 1, '2021-03-12 00:00:00', 'client_0202', '2022-02-12', '120.400000', '2021-05-31 04:07:59', '<div class=\"invoice-box\">\r\n			<table>\r\n				<tr class=\"top\">\r\n					<td colspan=\"2\">\r\n						<table>\r\n							<tr>\r\n								<td class=\"title\">\r\n									<img src=\"./images/logo.png\" alt=\"Company logo\" style=\"width: 100%; max-width: 300px\" />\r\n								</td>\r\n\r\n								<td>\r\n									Invoice #: 123<br />\r\n									Created: January 1, 2015<br />\r\n									Due: February 1, 2015\r\n								</td>\r\n							</tr>\r\n						</table>\r\n					</td>\r\n				</tr>\r\n\r\n				<tr class=\"information\">\r\n					<td colspan=\"2\">\r\n						<table>\r\n							<tr>\r\n								<td>\r\n									Sparksuite, Inc.<br />\r\n									12345 Sunny Road<br />\r\n									Sunnyville, TX 12345\r\n								</td>\r\n\r\n								<td>\r\n									Acme Corp.<br />\r\n									John Doe<br />\r\n									john@example.com\r\n								</td>\r\n							</tr>\r\n						</table>\r\n					</td>\r\n				</tr>\r\n\r\n				<tr class=\"heading\">\r\n					<td>Payment Method</td>\r\n\r\n					<td>Check #</td>\r\n				</tr>\r\n\r\n				<tr class=\"details\">\r\n					<td>Check</td>\r\n\r\n					<td>1000</td>\r\n				</tr>\r\n\r\n				<tr class=\"heading\">\r\n					<td>Item</td>\r\n\r\n					<td>Price</td>\r\n				</tr>\r\n\r\n				<tr class=\"item\">\r\n					<td>Website design</td>\r\n\r\n					<td>$300.00</td>\r\n				</tr>\r\n\r\n				<tr class=\"item\">\r\n					<td>Hosting (3 months)</td>\r\n\r\n					<td>$75.00</td>\r\n				</tr>\r\n\r\n				<tr class=\"item last\">\r\n					<td>Domain name (1 year)</td>\r\n\r\n					<td>$10.00</td>\r\n				</tr>\r\n\r\n				<tr class=\"total\">\r\n					<td></td>\r\n\r\n					<td>Total: $385.00</td>\r\n				</tr>\r\n			</table>\r\n		</div>', '{leads: 1, contact: 1}', 'InProgress', NULL),
(4, 'Invoice Template BlueWithWhite', '/templates/invoices/draft1.html', 0, '9999-05-31 06:08:57', 'template@testing.test', '9999-05-31', '0.000000', '2021-05-31 04:12:38', '<html>\r\n<style>\r\nbody {\r\n    font-family:\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;\r\n}\r\n.inv-template-header {\r\n    background-color: #0d83dd;\r\n    color: #FFF;\r\n    display: block;\r\n    width: 100%;\r\n}\r\n.inv-template-body {\r\n    width: 100%;\r\n    display: block;\r\n}\r\n.inv-template-footer {\r\n    width: 100%;\r\n    background-color: #0d83dd;\r\n    color: #FFF;\r\n    display: block;\r\n}\r\n.row {\r\n    width: 100%;\r\n    display: block;\r\n    padding: 10px;\r\n}\r\n.col30 {\r\n    width: 30%;\r\n    display: inline-block;\r\n    padding: 20px;\r\n    vertical-align: middle;\r\n}\r\n.col20 {\r\n    width: 24%;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n.inv-template-title {\r\n    font-size: 40px;\r\n    padding: 20px;\r\n}\r\n.little-row {\r\n    display: block;\r\n    padding: 5px;\r\n    font-weight: 100;\r\n}\r\n.logo, .inv-template-logo {\r\n    width: 200px;\r\n}\r\n.padding20 {\r\n    padding: 20px;\r\n}\r\n.padding10 {\r\n    padding: 10px;\r\n}\r\n.little {\r\n    background: rgba(255,255,255,0.5);\r\n    color: #fff;\r\n    font-size: 24px;\r\n    padding: 5px;\r\n}\r\n.inv-template-total {\r\n    background-color: #ccc;\r\n    padding: 20px;\r\n    color: #333;\r\n}\r\ntable, thead, tbody, th, tr, td {\r\n    padding: 10px;\r\n}\r\nthead, th {\r\n    background: #0d83dd;\r\n    color: #fff;\r\n    font-weight: 100;\r\n}\r\ntbody, tr, td {\r\n    font-weight: 100;\r\n}\r\nh3, h2 {\r\n    font-weight: 200;\r\n}\r\nh4 {\r\n    font-weight: 400;\r\n}\r\n.tax {\r\n    margin: 0px;\r\n    background: transparent;\r\n    color: #333;\r\n    padding-left: 0px !important;\r\n}\r\n.tax thead th {\r\n    background: transparent;\r\n    color: #333;\r\n    text-align: left;\r\n    padding-left: 0px !important;\r\n    font-size: 12px;\r\n}\r\n.totals {\r\n    display: inline-flex;\r\n    width: 200px;\r\n}\r\n.total {\r\n    border-top: #333 3px solid;\r\n}\r\n.terms {\r\n    border-left: 3px solid #0d83dd;\r\n    color: #333;\r\n    margin: 50px;\r\n}\r\n</style>\r\n<div class=\"inv-template-header\">\r\n    <div class=\"col20\">\r\n        <div class=\"inv-template-logo padding20\"><img src=\"../../images/login.jpg\" class=\"logo\" /></div>\r\n    </div>\r\n    <div class=\"col20 middle\">\r\n        <div class=\"inv-template-title\">\r\n            <div><span class=\"little\">Manatee</span></div>\r\n            Invoice <span class=\"inv-template-number\">001</span>\r\n        </div>\r\n    </div>\r\n    <ul class=\"col20 middle\">\r\n        <li class=\"little-row\">Address</li>\r\n        <li class=\"little-row\">Email</li>\r\n        <li class=\"little-row\">Website</li>\r\n    </ul>\r\n    <div class=\"col20 middle\">\r\n        <div class=\"little-row\">City</div>\r\n        <div class=\"little-row\">State</div>\r\n        <div class=\"little-row\">CP 0000</div>\r\n    </div>\r\n</div>\r\n<div class=\"inv-template-body\">\r\n    <div class=\"col30\">\r\n        <h3>Billed To</h3>\r\n        <div class=\"little-row\">Company</div>\r\n        <div class=\"little-row\">Address, Email, Website</div>\r\n        <div class=\"little-row\">City, State, CP 0000</div>\r\n    </div>\r\n    <div class=\"col30\">\r\n        <div class=\"little-row\">\r\n            <h4>Invoice Number</h4>\r\n            00001\r\n        </div>\r\n        <div class=\"little-row\">\r\n            <h4>Date of Issue</h4>\r\n            2021-03-10\r\n        </div>\r\n    </div>\r\n    <div class=\"col30\">\r\n        <div class=\"inv-template-total\"><h3>Total</h3> $<span>000.1</span></div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <table>\r\n            <thead>\r\n                <th>Description</th>\r\n                <th>Cost/Rate</th>\r\n                <th>Amount</th>\r\n            </thead>\r\n            <tbody>\r\n                <td>Sample 01</td>\r\n                <td>15.5</td>\r\n                <td>150</td>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col30\">\r\n            <div class=\"subtotal\">\r\n                <div class=\"totals\"><h3>Subtotal</h3></div>\r\n                <div class=\"totals\">1.000</div>\r\n            </div>\r\n            <div class=\"tax\">\r\n                <h3>Tax</h3>\r\n                <table class=\"tax\">\r\n                    <thead class=\"tax\">\r\n                        <th>Concept</th>\r\n                        <th>% Percentage</th>\r\n                        <th>$ Amount</th>\r\n                    </thead>\r\n                    <tbody class=\"tax\">\r\n                        <tr class=\"tax\">\r\n                            <td class=\"tax\">Invoice Template</td>\r\n                            <td class=\"tax\">1</td>\r\n                            <td class=\"tax\"><span>0.0003</span></td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n            <div class=\"inv-template-total\">\r\n                <div class=\"totals\"><h3>Total</h3></div>\r\n                <div class=\"totals\">1.100</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col30 terms\">\r\n            <h3>Invoice Terms</h3>\r\n            <p>Conditions... Goods... etc</p>\r\n        </div>\r\n    </div>\r\n</div>\r\n</html>', NULL, 'Template', '/images/templates/invoices/1.png'),
(5, 'Template Calm', '/templates/invoices/draft2.html', 0, '9999-05-31 06:26:46', 'test@testing.test', '9999-05-31', '0.000000', '2021-05-31 04:30:27', '<html>\r\n<style>\r\nbody {\r\n    font-family:\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;\r\n}\r\n.inv-template-header {\r\n    background-color: #ccc;\r\n    color: #FFF;\r\n    display: block;\r\n    width: 100%;\r\n}\r\n.inv-template-body {\r\n    width: 100%;\r\n    display: block;\r\n}\r\n.inv-template-footer {\r\n    width: 100%;\r\n    background-color: #ccc;\r\n    color: #FFF;\r\n    display: block;\r\n}\r\n.row {\r\n    width: 100%;\r\n    display: block;\r\n    padding: 10px;\r\n}\r\n.col30 {\r\n    width: 30%;\r\n    display: inline-block;\r\n    padding: 20px;\r\n    vertical-align: middle;\r\n}\r\n.col20 {\r\n    width: 24%;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n.inv-template-title {\r\n    font-size: 40px;\r\n    padding: 20px;\r\n}\r\n.little-row {\r\n    display: block;\r\n    padding: 5px;\r\n    font-weight: 100;\r\n}\r\n.logo, .inv-template-logo {\r\n    width: 200px;\r\n}\r\n.padding20 {\r\n    padding: 20px;\r\n}\r\n.padding10 {\r\n    padding: 10px;\r\n}\r\n.little {\r\n    background: rgba(255,255,255,0.5);\r\n    color: #fff;\r\n    font-size: 24px;\r\n    padding: 5px;\r\n}\r\n.inv-template-total {\r\n    background-color: #ccc;\r\n    padding: 20px;\r\n    color: #333;\r\n}\r\ntable, thead, tbody, th, tr, td {\r\n    padding: 10px;\r\n}\r\nthead, th {\r\n    background: #ccc;\r\n    color: #fff;\r\n    font-weight: 100;\r\n}\r\ntbody, tr, td {\r\n    font-weight: 100;\r\n}\r\nh3, h2 {\r\n    font-weight: 200;\r\n}\r\nh4 {\r\n    font-weight: 400;\r\n}\r\n.tax {\r\n    margin: 0px;\r\n    background: transparent;\r\n    color: #333;\r\n    padding-left: 0px !important;\r\n}\r\n.tax thead th {\r\n    background: transparent;\r\n    color: #333;\r\n    text-align: left;\r\n    padding-left: 0px !important;\r\n    font-size: 12px;\r\n}\r\n.totals {\r\n    display: inline-flex;\r\n    width: 200px;\r\n}\r\n.total {\r\n    border-top: #333 3px solid;\r\n}\r\n.terms {\r\n    border-left: 3px solid #ccc;\r\n    color: #333;\r\n    width: 60%;\r\n}\r\n.extend-t {\r\n    width: 98%;\r\n    background-color: #eee;\r\n}\r\n</style>\r\n<div class=\"inv-template-header\">\r\n    <div class=\"col20\">\r\n        <div class=\"inv-template-logo padding20\"><img src=\"../../images/login.jpg\" class=\"logo\" /></div>\r\n    </div>\r\n    <div class=\"col20 middle\">\r\n        <div class=\"inv-template-title\">\r\n            <div><span class=\"little\">Manatee</span></div>\r\n            Invoice <span class=\"inv-template-number\">001</span>\r\n        </div>\r\n    </div>\r\n    <ul class=\"col20 middle\">\r\n        <li class=\"little-row\">Address</li>\r\n        <li class=\"little-row\">Email</li>\r\n        <li class=\"little-row\">Website</li>\r\n    </ul>\r\n    <div class=\"col20 middle\">\r\n        <div class=\"little-row\">City</div>\r\n        <div class=\"little-row\">State</div>\r\n        <div class=\"little-row\">CP 0000</div>\r\n    </div>\r\n</div>\r\n<div class=\"inv-template-body\">\r\n    <div class=\"col30\">\r\n        <h3>Billed To</h3>\r\n        <div class=\"little-row\">Company</div>\r\n        <div class=\"little-row\">Address, Email, Website</div>\r\n        <div class=\"little-row\">City, State, CP 0000</div>\r\n    </div>\r\n    <div class=\"col30\">\r\n        <div class=\"little-row\">\r\n            <h4>Invoice Number</h4>\r\n            00001\r\n        </div>\r\n        <div class=\"little-row\">\r\n            <h4>Date of Issue</h4>\r\n            2021-03-10\r\n        </div>\r\n    </div>\r\n    <div class=\"col30\">\r\n        <div class=\"inv-template-total\"><h3>Total</h3> $<span>000.1</span></div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <table class=\"extend-t\">\r\n            <thead>\r\n                <th>Description</th>\r\n                <th>Cost/Rate</th>\r\n                <th>Amount</th>\r\n            </thead>\r\n            <tbody>\r\n                <td>Sample 01</td>\r\n                <td>15.5</td>\r\n                <td>150</td>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col30 terms\">\r\n            <h3>Invoice Terms</h3>\r\n            <p>Conditions... Goods... etc</p>\r\n        </div>\r\n        <div class=\"col30\">\r\n            <div class=\"subtotal\">\r\n                <div class=\"totals\"><h3>Subtotal</h3></div>\r\n                <div class=\"totals\">1.000</div>\r\n            </div>\r\n            <div class=\"tax\">\r\n                <h3>Tax</h3>\r\n                <table class=\"tax\">\r\n                    <thead class=\"tax\">\r\n                        <th>Concept</th>\r\n                        <th>% Percentage</th>\r\n                        <th>$ Amount</th>\r\n                    </thead>\r\n                    <tbody class=\"tax\">\r\n                        <tr class=\"tax\">\r\n                            <td class=\"tax\">Invoice Template</td>\r\n                            <td class=\"tax\">1</td>\r\n                            <td class=\"tax\"><span>0.0003</span></td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n            <div class=\"inv-template-total\">\r\n                <div class=\"totals\"><h3>Total</h3></div>\r\n                <div class=\"totals\">1.100</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</html>', NULL, 'Template', '/images/templates/Invoices/2.png'),
(6, 'Template Greys', '/templates/invoices/draft3.html', 0, '9999-05-31 06:26:46', 'testing@test.test', '9999-05-31', '0.000000', '2021-05-31 04:30:27', '<html>\r\n<style>\r\nbody {\r\n    font-family:\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;\r\n}\r\n.inv-template-header {\r\n    background-color: #958e8e;\r\n    color: #FFF;\r\n    display: block;\r\n    width: 100%;\r\n}\r\n.inv-template-body {\r\n    width: 100%;\r\n    display: block;\r\n}\r\n.inv-template-footer {\r\n    width: 100%;\r\n    background-color: #ccc;\r\n    color: #FFF;\r\n    display: block;\r\n}\r\n.row {\r\n    width: 100%;\r\n    display: block;\r\n    padding: 10px;\r\n}\r\n.col30 {\r\n    width: 30%;\r\n    display: inline-block;\r\n    padding: 20px;\r\n    vertical-align: middle;\r\n}\r\n.col20 {\r\n    width: 24%;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n.inv-template-title {\r\n    font-size: 40px;\r\n    padding: 20px;\r\n}\r\n.little-row {\r\n    display: block;\r\n    padding: 5px;\r\n    font-weight: 100;\r\n}\r\n.logo, .inv-template-logo {\r\n    width: 200px;\r\n}\r\n.padding20 {\r\n    padding: 20px;\r\n}\r\n.padding10 {\r\n    padding: 10px;\r\n}\r\n.little {\r\n    background: rgba(255,255,255,0.5);\r\n    color: #fff;\r\n    font-size: 24px;\r\n    padding: 5px;\r\n}\r\n.inv-template-total {\r\n    background-color: #ccc;\r\n    padding: 20px;\r\n    color: #333;\r\n}\r\ntable, thead, tbody, th, tr, td {\r\n    padding: 10px;\r\n}\r\nthead, th {\r\n    background: #ccc;\r\n    color: #fff;\r\n    font-weight: 100;\r\n}\r\ntbody, tr, td {\r\n    font-weight: 100;\r\n}\r\nh3, h2 {\r\n    font-weight: 200;\r\n}\r\nh4 {\r\n    font-weight: 400;\r\n}\r\n.tax {\r\n    margin: 0px;\r\n    background: transparent;\r\n    color: #333;\r\n    padding-left: 0px !important;\r\n}\r\n.tax thead th {\r\n    background: transparent;\r\n    color: #333;\r\n    text-align: left;\r\n    padding-left: 0px !important;\r\n    font-size: 12px;\r\n}\r\n.totals {\r\n    display: inline-flex;\r\n    width: 200px;\r\n}\r\n.total {\r\n    border-top: #333 3px solid;\r\n}\r\n.terms {\r\n    border-left: 3px solid #ccc;\r\n    color: #333;\r\n    width: 60%;\r\n}\r\n.extend-t {\r\n    width: 98%;\r\n    background-color: #eee;\r\n}\r\n</style>\r\n<div class=\"inv-template-header\">\r\n    <div class=\"col20 middle\">\r\n        <div class=\"inv-template-title\">\r\n            <div><span class=\"little\">Manatee</span></div>\r\n            Invoice <span class=\"inv-template-number\">001</span>\r\n        </div>\r\n    </div>\r\n    <ul class=\"col20 middle\">\r\n        <li class=\"little-row\">Address</li>\r\n        <li class=\"little-row\">Email</li>\r\n        <li class=\"little-row\">Website</li>\r\n    </ul>\r\n    <div class=\"col20 middle\">\r\n        <div class=\"little-row\">City</div>\r\n        <div class=\"little-row\">State</div>\r\n        <div class=\"little-row\">CP 0000</div>\r\n    </div>\r\n</div>\r\n<div class=\"inv-template-body\">\r\n    <div class=\"col30\">\r\n        <h3>Billed To</h3>\r\n        <div class=\"little-row\">Company</div>\r\n        <div class=\"little-row\">Address, Email, Website</div>\r\n        <div class=\"little-row\">City, State, CP 0000</div>\r\n    </div>\r\n    <div class=\"col30\">\r\n        <div class=\"little-row\">\r\n            <h4>Invoice Number</h4>\r\n            00001\r\n        </div>\r\n        <div class=\"little-row\">\r\n            <h4>Date of Issue</h4>\r\n            2021-03-10\r\n        </div>\r\n    </div>\r\n    <div class=\"col30\">\r\n        <div class=\"inv-template-total\"><h3>Total</h3> $<span>000.1</span></div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <table class=\"extend-t\">\r\n            <thead>\r\n                <th>Description</th>\r\n                <th>Cost/Rate</th>\r\n                <th>Amount</th>\r\n            </thead>\r\n            <tbody>\r\n                <td>Sample 01</td>\r\n                <td>15.5</td>\r\n                <td>150</td>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col30 terms\">\r\n            <h3>Invoice Terms</h3>\r\n            <p>Conditions... Goods... etc</p>\r\n        </div>\r\n        <div class=\"col30\">\r\n            <div class=\"subtotal\">\r\n                <div class=\"totals\"><h3>Subtotal</h3></div>\r\n                <div class=\"totals\">1.000</div>\r\n            </div>\r\n            <div class=\"tax\">\r\n                <h3>Tax</h3>\r\n                <table class=\"tax\">\r\n                    <thead class=\"tax\">\r\n                        <th>Concept</th>\r\n                        <th>% Percentage</th>\r\n                        <th>$ Amount</th>\r\n                    </thead>\r\n                    <tbody class=\"tax\">\r\n                        <tr class=\"tax\">\r\n                            <td class=\"tax\">Invoice Template</td>\r\n                            <td class=\"tax\">1</td>\r\n                            <td class=\"tax\"><span>0.0003</span></td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n            <div class=\"inv-template-total\">\r\n                <div class=\"totals\"><h3>Total</h3></div>\r\n                <div class=\"totals\">1.100</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</html>', NULL, 'Template', '/images/templates/invoices/3.png'),
(7, 'Template BlackAndGrey', '/templates/invoices/draft4.html', 0, '9999-05-31 06:32:12', 'testing@test.test', '9999-05-31', '0.000000', '2021-05-31 04:34:54', '<html>\r\n<style>\r\nbody {\r\n    font-family:\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;\r\n    background-color: #333;\r\n    color: #fff;\r\n}\r\n.inv-template-header {\r\n    border-bottom: 3px solid;\r\n    color: #FFF;\r\n    display: block;\r\n    width: 100%;\r\n}\r\n.inv-template-body {\r\n    width: 100%;\r\n    display: block;\r\n}\r\n.inv-template-footer {\r\n    width: 100%;\r\n    background-color: #ccc;\r\n    color: #FFF;\r\n    display: block;\r\n}\r\n.row {\r\n    width: 100%;\r\n    display: block;\r\n    padding: 10px;\r\n}\r\n.col30 {\r\n    width: 30%;\r\n    display: inline-block;\r\n    padding: 20px;\r\n    vertical-align: middle;\r\n}\r\n.col20 {\r\n    width: 24%;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n.inv-template-title {\r\n    font-size: 40px;\r\n    padding: 20px;\r\n}\r\n.little-row {\r\n    display: block;\r\n    padding: 5px;\r\n    font-weight: 100;\r\n}\r\n.logo, .inv-template-logo {\r\n    width: 200px;\r\n}\r\n.padding20 {\r\n    padding: 20px;\r\n}\r\n.padding10 {\r\n    padding: 10px;\r\n}\r\n.little {\r\n    background: rgba(255,255,255,0.5);\r\n    color: #fff;\r\n    font-size: 24px;\r\n    padding: 5px;\r\n}\r\n.inv-template-total {\r\n    background-color: #ccc;\r\n    padding: 20px;\r\n    color: #333;\r\n}\r\ntable, thead, tbody, th, tr, td {\r\n    padding: 10px;\r\n}\r\nthead, th {\r\n    background: #ccc;\r\n    color: #fff;\r\n    font-weight: 100;\r\n}\r\ntbody, tr, td {\r\n    font-weight: 100;\r\n    color: #333;\r\n}\r\nh3, h2 {\r\n    font-weight: 200;\r\n}\r\nh4 {\r\n    font-weight: 400;\r\n}\r\n.tax {\r\n    margin: 0px;\r\n    background: transparent;\r\n    color: #333;\r\n    padding-left: 0px !important;\r\n}\r\n.tax thead th {\r\n    background: transparent;\r\n    color: #333;\r\n    text-align: left;\r\n    padding-left: 0px !important;\r\n    font-size: 12px;\r\n}\r\n.totals {\r\n    display: inline-flex;\r\n    width: 200px;\r\n}\r\n.total {\r\n    border-top: #333 3px solid;\r\n}\r\n.terms {\r\n    border-left: 3px solid #ccc;\r\n    color: #ccc;\r\n    width: 60%;\r\n}\r\n.extend-t {\r\n    width: 98%;\r\n    background-color: #eee;\r\n}\r\n</style>\r\n<div class=\"inv-template-header\">\r\n    <div class=\"col20 middle\">\r\n        <div class=\"inv-template-title\">\r\n            <div><span class=\"little\">Manatee</span></div>\r\n            Invoice <span class=\"inv-template-number\">001</span>\r\n        </div>\r\n    </div>\r\n    <ul class=\"col20 middle\">\r\n        <li class=\"little-row\">Address</li>\r\n        <li class=\"little-row\">Email</li>\r\n        <li class=\"little-row\">Website</li>\r\n    </ul>\r\n    <div class=\"col20 middle\">\r\n        <div class=\"little-row\">City</div>\r\n        <div class=\"little-row\">State</div>\r\n        <div class=\"little-row\">CP 0000</div>\r\n    </div>\r\n</div>\r\n<div class=\"inv-template-body\">\r\n    <div class=\"col30\">\r\n        <h3>Billed To</h3>\r\n        <div class=\"little-row\">Company</div>\r\n        <div class=\"little-row\">Address, Email, Website</div>\r\n        <div class=\"little-row\">City, State, CP 0000</div>\r\n    </div>\r\n    <div class=\"col30\">\r\n        <div class=\"little-row\">\r\n            <h4>Invoice Number</h4>\r\n            00001\r\n        </div>\r\n        <div class=\"little-row\">\r\n            <h4>Date of Issue</h4>\r\n            2021-03-10\r\n        </div>\r\n    </div>\r\n    <div class=\"col30\">\r\n        <div class=\"inv-template-total\"><h3>Total</h3> $<span>000.1</span></div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <table class=\"extend-t\">\r\n            <thead>\r\n                <th>Description</th>\r\n                <th>Cost/Rate</th>\r\n                <th>Amount</th>\r\n            </thead>\r\n            <tbody>\r\n                <td>Sample 01</td>\r\n                <td>15.5</td>\r\n                <td>150</td>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col30 terms\">\r\n            <h3>Invoice Terms</h3>\r\n            <p>Conditions... Goods... etc</p>\r\n        </div>\r\n        <div class=\"col30\">\r\n            <div class=\"subtotal\">\r\n                <div class=\"totals\"><h3>Subtotal</h3></div>\r\n                <div class=\"totals\">1.000</div>\r\n            </div>\r\n            <div class=\"tax\">\r\n                <h3>Tax</h3>\r\n                <table class=\"tax\">\r\n                    <thead class=\"tax\">\r\n                        <th>Concept</th>\r\n                        <th>% Percentage</th>\r\n                        <th>$ Amount</th>\r\n                    </thead>\r\n                    <tbody class=\"tax\">\r\n                        <tr class=\"tax\">\r\n                            <td class=\"tax\">Invoice Template</td>\r\n                            <td class=\"tax\">1</td>\r\n                            <td class=\"tax\"><span>0.0003</span></td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n            <div class=\"inv-template-total\">\r\n                <div class=\"totals\"><h3>Total</h3></div>\r\n                <div class=\"totals\">1.100</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</html>', NULL, 'Template', '/images/templates/invoices/4.png'),
(8, 'Template Blue', '/templates/invoices/draft5.html', 0, '9999-05-31 06:32:12', 'testing@test.test', '9999-05-31', '0.000000', '2021-05-31 04:34:54', '<html>\r\n<style>\r\nbody {\r\n    font-family:\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;\r\n    background-color: rgb(17, 117, 248);\r\n    color: #fff;\r\n}\r\n.inv-template-header {\r\n    border-bottom: 3px solid;\r\n    color: #FFF;\r\n    display: block;\r\n    width: 100%;\r\n}\r\n.inv-template-body {\r\n    width: 100%;\r\n    display: block;\r\n}\r\n.inv-template-footer {\r\n    width: 100%;\r\n    background-color: #ccc;\r\n    color: #FFF;\r\n    display: block;\r\n}\r\n.row {\r\n    width: 100%;\r\n    display: block;\r\n    padding: 10px;\r\n}\r\n.col30 {\r\n    width: 30%;\r\n    display: inline-block;\r\n    padding: 20px;\r\n    vertical-align: middle;\r\n}\r\n.col20 {\r\n    width: 24%;\r\n    display: inline-block;\r\n    vertical-align: middle;\r\n}\r\n.inv-template-title {\r\n    font-size: 40px;\r\n    padding: 20px;\r\n}\r\n.little-row {\r\n    display: block;\r\n    padding: 5px;\r\n    font-weight: 100;\r\n}\r\n.logo, .inv-template-logo {\r\n    width: 200px;\r\n}\r\n.padding20 {\r\n    padding: 20px;\r\n}\r\n.padding10 {\r\n    padding: 10px;\r\n}\r\n.little {\r\n    background: rgba(255,255,255,0.5);\r\n    color: #fff;\r\n    font-size: 24px;\r\n    padding: 5px;\r\n}\r\n.inv-template-total {\r\n    background-color: #eee;\r\n    padding: 20px;\r\n    color: #333;\r\n}\r\ntable, thead, tbody, th, tr, td {\r\n    padding: 10px;\r\n}\r\nthead, th {\r\n    background: #eee;\r\n    color: #333;\r\n    font-weight: 100;\r\n}\r\ntbody, tr, td {\r\n    font-weight: 100;\r\n    color: #333;\r\n}\r\nh3, h2 {\r\n    font-weight: 200;\r\n}\r\nh4 {\r\n    font-weight: 400;\r\n}\r\n.tax {\r\n    margin: 0px;\r\n    background: transparent;\r\n    color: #fff;\r\n    padding-left: 0px !important;\r\n}\r\n.tax thead th {\r\n    background: transparent;\r\n    color: #fff;\r\n    text-align: left;\r\n    padding-left: 0px !important;\r\n    font-size: 12px;\r\n}\r\n.totals {\r\n    display: inline-flex;\r\n    width: 200px;\r\n}\r\n.total {\r\n    border-top: #333 3px solid;\r\n}\r\n.terms {\r\n    border-left: 3px solid #ccc;\r\n    color: #ccc;\r\n    width: 60%;\r\n}\r\n.extend-t {\r\n    width: 98%;\r\n    background-color: #fff;\r\n}\r\n</style>\r\n<div class=\"inv-template-header\">\r\n    <div class=\"col20 middle\">\r\n        <div class=\"inv-template-title\">\r\n            <div><span class=\"little\">Manatee</span></div>\r\n            Invoice <span class=\"inv-template-number\">001</span>\r\n        </div>\r\n    </div>\r\n    <ul class=\"col20 middle\">\r\n        <li class=\"little-row\">Address</li>\r\n        <li class=\"little-row\">Email</li>\r\n        <li class=\"little-row\">Website</li>\r\n    </ul>\r\n    <div class=\"col20 middle\">\r\n        <div class=\"little-row\">City</div>\r\n        <div class=\"little-row\">State</div>\r\n        <div class=\"little-row\">CP 0000</div>\r\n    </div>\r\n</div>\r\n<div class=\"inv-template-body\">\r\n    <div class=\"col30\">\r\n        <h3>Billed To</h3>\r\n        <div class=\"little-row\">Company</div>\r\n        <div class=\"little-row\">Address, Email, Website</div>\r\n        <div class=\"little-row\">City, State, CP 0000</div>\r\n    </div>\r\n    <div class=\"col30\">\r\n        <div class=\"little-row\">\r\n            <h4>Invoice Number</h4>\r\n            00001\r\n        </div>\r\n        <div class=\"little-row\">\r\n            <h4>Date of Issue</h4>\r\n            2021-03-10\r\n        </div>\r\n    </div>\r\n    <div class=\"col30\">\r\n        <div class=\"inv-template-total\"><h3>Total</h3> $<span>000.1</span></div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <table class=\"extend-t\">\r\n            <thead>\r\n                <th>Description</th>\r\n                <th>Cost/Rate</th>\r\n                <th>Amount</th>\r\n            </thead>\r\n            <tbody>\r\n                <td>Sample 01</td>\r\n                <td>15.5</td>\r\n                <td>150</td>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col30 terms\">\r\n            <h3>Invoice Terms</h3>\r\n            <p>Conditions... Goods... etc</p>\r\n        </div>\r\n        <div class=\"col30\">\r\n            <div class=\"subtotal\">\r\n                <div class=\"totals\"><h3>Subtotal</h3></div>\r\n                <div class=\"totals\">1.000</div>\r\n            </div>\r\n            <div class=\"tax\">\r\n                <h3>Tax</h3>\r\n                <table class=\"tax\">\r\n                    <thead class=\"tax\">\r\n                        <th>Concept</th>\r\n                        <th>% Percentage</th>\r\n                        <th>$ Amount</th>\r\n                    </thead>\r\n                    <tbody class=\"tax\">\r\n                        <tr class=\"tax\">\r\n                            <td class=\"tax\">Invoice Template</td>\r\n                            <td class=\"tax\">1</td>\r\n                            <td class=\"tax\"><span>0.0003</span></td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n            <div class=\"inv-template-total\">\r\n                <div class=\"totals\"><h3>Total</h3></div>\r\n                <div class=\"totals\">1.100</div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</html>', NULL, 'Template', '/images/templates/invoices/5.png');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_contact`
--

CREATE TABLE `invoice_contact` (
  `id` int(11) NOT NULL,
  `invoiceid` int(11) NOT NULL,
  `contactid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `invoice_contact`
--

INSERT INTO `invoice_contact` (`id`, `invoiceid`, `contactid`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_lead`
--

CREATE TABLE `invoice_lead` (
  `id` int(11) NOT NULL,
  `invoiceid` int(11) NOT NULL,
  `leadid` int(11) NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `invoice_lead`
--

INSERT INTO `invoice_lead` (`id`, `invoiceid`, `leadid`, `active`) VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `date_captured` timestamp NULL DEFAULT current_timestamp(),
  `short_description` varchar(250) COLLATE utf8mb4_bin DEFAULT NULL,
  `event_start` datetime NOT NULL,
  `event_end` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL,
  `contacts` longtext COLLATE utf8mb4_bin DEFAULT NULL,
  `type_of_event` varchar(250) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `users_assigned` longtext COLLATE utf8mb4_bin NOT NULL,
  `following` longtext COLLATE utf8mb4_bin NOT NULL,
  `tags` longtext COLLATE utf8mb4_bin NOT NULL,
  `details` longtext COLLATE utf8mb4_bin NOT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `date_captured`, `short_description`, `event_start`, `event_end`, `status`, `contacts`, `type_of_event`, `users_assigned`, `following`, `tags`, `details`, `related_to`) VALUES
(2, '2021-04-15 00:17:07', 'Birthday Party for Venue 3', '2021-03-31 16:23:00', '2021-04-01 00:23:00', 1, '{\"Contact One\":{\"Phone\":\"398929230\",\"Email\":\"mymail@mail.com\",\"Hours to contact\":\"From 8 AM to 5 PM\",\"Is primary contact\":\"Yes\",\"Home Phone\":\"929183089\",\"Address\":\"Street 210\",\"Alternative email\":\"mymail2@mail.com\"},\"Contact Two\":{\"Phone\":\"1902320930123\",\"Email\":\"my2212ail@mail.com\",\"Hours to contact\":\"From 9 AM to 6 PM\",\"Is primary contact\":\"No\",\"Home Phone\":\"929183089\",\"Address\":\"Street 310\",\"Alternative email\":\"mymail3@mail.com\"}}', 'Birthday Party', '{\"users\":[\"User 23092\",\"Abc\",\"Now\"]}', '{\"users\":[\"User1\",\"User3\"]}', 'Party,Single Day,Billed Hourly', 'Some details go here', '{invoice: 1, booking: 1, proposal: 1, notes: {1, 3}}'),
(3, '2021-05-14 14:11:39', 'Business Formal Meeting', '2021-05-14 05:10:58', '2021-05-14 11:10:58', 4, '[]', 'Short-term', '{\"users\":[\"Testing User 2021\"]}', '{\"users\":[\"Testing User 2021\"]}', 'tags, tag', 'details', NULL),
(7, '2021-05-19 19:49:04', 'Conference about new technologies', '2021-05-19 13:48:08', '2021-05-19 19:48:08', 4, '', 'Formal Event', '', '', 'new test, tag', '', NULL),
(8, '2021-05-19 20:34:52', 'University Outdoor event 3 days', '2021-05-19 14:34:35', '2021-05-19 20:34:35', 0, '', 'Long-term / Some days', '', '', 'tags', '', NULL),
(9, '2021-05-20 06:14:45', 'Graduation outdoor course', '2021-05-20 00:14:29', '2021-05-20 06:14:29', 0, NULL, 'Long-term / Some days', '', '', 'tt', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `leads_contacts`
--

CREATE TABLE `leads_contacts` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `address` varchar(250) COLLATE utf8mb4_bin NOT NULL,
  `contact_hours` longtext COLLATE utf8mb4_bin NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `leads_contacts`
--

INSERT INTO `leads_contacts` (`id`, `fullname`, `email`, `phone`, `address`, `contact_hours`, `active`, `related_to`) VALUES
(1, 'Nombre de Fantasia', 'micorreo@gmail.com', '23912923489032', 'Los saltos y brincos 344', '{\"preferred_time\":\"Monday to Sunday 8 am to 7 pm\"}', 0, '{lead: 1}'),
(2, 'Some new lead', 'lead_mail2@test.com', '1239818923983', 'Some new address', '\"From 04/24/2021 11:51 PM To 04/29/2021 11:51 PM\"', 1, '{lead: 2}');

-- --------------------------------------------------------

--
-- Table structure for table `leads_history`
--

CREATE TABLE `leads_history` (
  `id` int(11) NOT NULL,
  `type_of_event` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `details` longtext COLLATE utf8mb4_bin NOT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `lead_contacts`
--

CREATE TABLE `lead_contacts` (
  `id` int(11) NOT NULL,
  `leadid` int(11) NOT NULL,
  `contactid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `lead_contacts`
--

INSERT INTO `lead_contacts` (`id`, `leadid`, `contactid`) VALUES
(4, 2, 2),
(5, 2, 3),
(6, 2, 4),
(7, 1, 10),
(8, 10, 19),
(9, 0, 1),
(10, 0, 2),
(11, 24, 1),
(12, 24, 2),
(13, 25, 1),
(14, 25, 2),
(15, 25, 3),
(16, 25, 4),
(17, 26, 1),
(18, 26, 2),
(19, 27, 1),
(20, 27, 2),
(21, 28, 1),
(22, 28, 3),
(23, 42, 1),
(24, 42, 2),
(25, 43, 1),
(26, 43, 2),
(27, 44, 1),
(28, 44, 2),
(29, 45, 1),
(30, 45, 2),
(31, 46, 1),
(32, 46, 2),
(33, 47, 1),
(34, 47, 2),
(35, 48, 1),
(36, 48, 2),
(37, 1, 1),
(38, 49, 1),
(39, 49, 2),
(40, 50, 1),
(41, 50, 2),
(42, 7, 1),
(43, 7, 4),
(44, 7, 2),
(45, 7, 3),
(46, 8, 1),
(47, 8, 2),
(48, 9, 1),
(49, 9, 2);

-- --------------------------------------------------------

--
-- Table structure for table `lead_messages`
--

CREATE TABLE `lead_messages` (
  `id` int(11) NOT NULL,
  `leadid` int(11) NOT NULL,
  `messageid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `lead_messages`
--

INSERT INTO `lead_messages` (`id`, `leadid`, `messageid`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `lead_notes`
--

CREATE TABLE `lead_notes` (
  `id` int(11) NOT NULL,
  `leadid` int(11) NOT NULL,
  `noteid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `lead_notes`
--

INSERT INTO `lead_notes` (`id`, `leadid`, `noteid`) VALUES
(1, 2, 1),
(2, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `lead_proposal`
--

CREATE TABLE `lead_proposal` (
  `id` int(11) NOT NULL,
  `leadid` int(11) NOT NULL,
  `proposalid` int(11) NOT NULL,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `lead_proposal`
--

INSERT INTO `lead_proposal` (`id`, `leadid`, `proposalid`, `active`) VALUES
(1, 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `lead_users`
--

CREATE TABLE `lead_users` (
  `id` int(11) NOT NULL,
  `leadid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `type` varchar(250) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `lead_users`
--

INSERT INTO `lead_users` (`id`, `leadid`, `userid`, `type`) VALUES
(1, 3, 1, 'ASSIGNED'),
(2, 3, 1, 'FOLLOW'),
(3, 4, 1, 'ASSIGNED'),
(4, 4, 2, 'ASSIGNED'),
(5, 4, 1, 'FOLLOW'),
(6, 4, 2, 'FOLLOW'),
(7, 2, 1, 'ASSIGNED'),
(8, 2, 1, 'FOLLOW'),
(9, 10, 10, 'ASSIGNED'),
(10, 0, 1, 'ASSIGNED'),
(11, 0, 2, 'ASSIGNED'),
(12, 0, 1, 'FOLLOW'),
(13, 0, 2, 'FOLLOW'),
(14, 24, 1, 'ASSIGNED'),
(15, 24, 2, 'ASSIGNED'),
(16, 24, 1, 'FOLLOW'),
(17, 24, 2, 'FOLLOW'),
(18, 25, 1, 'ASSIGNED'),
(19, 25, 2, 'ASSIGNED'),
(20, 25, 3, 'ASSIGNED'),
(21, 25, 1, 'FOLLOW'),
(22, 25, 2, 'FOLLOW'),
(23, 47, 2, 'ASSIGNED'),
(24, 47, 1, 'ASSIGNED'),
(25, 47, 2, 'FOLLOW'),
(26, 47, 1, 'FOLLOW'),
(27, 48, 1, 'ASSIGNED'),
(28, 48, 2, 'ASSIGNED'),
(29, 48, 1, 'FOLLOW'),
(30, 48, 2, 'FOLLOW'),
(31, 49, 1, 'ASSIGNED'),
(32, 49, 2, 'ASSIGNED'),
(33, 49, 1, 'FOLLOW'),
(34, 49, 2, 'FOLLOW'),
(35, 50, 1, 'ASSIGNED'),
(36, 50, 3, 'ASSIGNED'),
(37, 50, 1, 'FOLLOW'),
(38, 50, 2, 'FOLLOW'),
(39, 7, 1, 'ASSIGNED'),
(40, 7, 2, 'ASSIGNED'),
(41, 7, 1, 'FOLLOW'),
(42, 7, 2, 'FOLLOW'),
(43, 8, 2, 'ASSIGNED'),
(44, 8, 1, 'ASSIGNED'),
(45, 8, 1, 'FOLLOW'),
(46, 8, 2, 'FOLLOW'),
(47, 9, 1, 'ASSIGNED'),
(48, 9, 2, 'ASSIGNED'),
(49, 9, 1, 'FOLLOW'),
(50, 9, 2, 'FOLLOW');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message_date` datetime NOT NULL,
  `message_subject` varchar(250) COLLATE utf8mb4_bin NOT NULL,
  `message_body` text COLLATE utf8mb4_bin NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `event_id` int(11) NOT NULL,
  `from` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `to` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `message_date`, `message_subject`, `message_body`, `status`, `event_id`, `from`, `to`, `related_to`) VALUES
(1, '2021-04-13 00:00:00', 'Testing the messages sender', 'Checking if the message is received', 'Received', 445, 'lundi@testing.mail', 'awaiting_event@happy.mail', 'lead: 1, contact: 1'),
(2, '2021-04-13 00:00:00', 'Testing the messages sender', 'Checking if the message is received', 'Received', 445, 'martedi@testing.mail', 'awaiting_event@happy.mail', 'lead: 2, contact: 2'),
(3, '2021-05-13 00:00:00', 'Testing the messages', 'Checking if the message is received', 'Received', 445, 'martedi@testing.mail', 'awaiting_event@happy.mail', 'lead: 1, contact: 2');

-- --------------------------------------------------------

--
-- Table structure for table `message_contacts`
--

CREATE TABLE `message_contacts` (
  `id` int(11) NOT NULL,
  `messageid` int(11) NOT NULL,
  `contactid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `message_contacts`
--

INSERT INTO `message_contacts` (`id`, `messageid`, `contactid`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 2);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `archive_after` datetime NOT NULL,
  `set_remainder` longtext COLLATE utf8mb4_bin NOT NULL,
  `details` text COLLATE utf8mb4_bin NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `archive_after`, `set_remainder`, `details`, `created`, `status`, `related_to`) VALUES
(1, '2021-04-20 12:00:00', '\"2021-04-16 10:00:00\"', 'Lead said would probably be calling this week', '2021-04-07 05:32:41', 0, '{lead: 1}'),
(2, '2021-04-18 11:23:00', '{\"email\":\"testing@something.test\",\"time\":\"13:05:02\"}', 'Testing Note 01', '2021-04-07 05:33:18', 1, '{booking: 1}'),
(3, '2021-04-14 12:00:00', '\"2021-04-14 10:00:00\"', 'Lead specified a venue with large windows', '2021-04-13 12:24:37', 1, '{lead: 4}'),
(4, '2021-04-30 12:00:00', '\"2021-04-30 10:00:00\"', 'The venue 08 is unavailable for 8 weeks', '2021-04-13 12:25:21', 1, '{venue: 1}'),
(5, '2021-04-30 12:00:00', '\"2021-04-30 10:00:00\"', 'Lead said would probably be calling this week', '2021-04-13 12:25:54', 1, '{lead: 1}'),
(6, '2021-04-30 12:00:00', '\"2021-06-10 10:00:00\"', 'The lead is unavailable for 2 weeks', '2021-04-13 12:25:21', 1, '{venue: 2}'),
(7, '2021-04-30 12:00:00', '\"2021-06-10 10:00:00\"', 'New message pending to answer for this venue new booking', '2021-04-13 12:25:21', 1, '{venue: 2}');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `notification` text COLLATE utf8mb4_bin NOT NULL,
  `active` tinyint(1) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `link` varchar(255) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `notification`, `active`, `date`, `link`) VALUES
(1, 'Invoice due tomorrow', 1, '2021-05-05', '/invoices/1'),
(2, '{msg: \"New message from lead\", link: \"/leads/1\", link_text: \"Abc\"}', 1, '2021-05-06', ''),
(3, 'New message lead 2', 1, '2021-06-14', '/bookings/1'),
(4, 'New Invoice Ready', 1, '2021-06-14', '/invoices'),
(5, 'Testing Notifications Message', 1, '2021-06-14', '/messages/1'),
(6, 'Testing notifications Venue', 1, '2021-06-14', '/venues'),
(7, 'New Notification Test 03', 1, '2021-06-14', '/venues'),
(8, 'Test 03', 1, '2021-06-14', '/leads');

-- --------------------------------------------------------

--
-- Table structure for table `proposals`
--

CREATE TABLE `proposals` (
  `id` int(11) NOT NULL,
  `proposal_date` datetime NOT NULL,
  `proposal_lead` varchar(250) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `proposal` text COLLATE utf8mb4_bin NOT NULL,
  `status` varchar(250) COLLATE utf8mb4_bin NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `tags` longtext COLLATE utf8mb4_bin NOT NULL,
  `html_content` longtext COLLATE utf8mb4_bin DEFAULT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL,
  `img` varchar(250) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `proposals`
--

INSERT INTO `proposals` (`id`, `proposal_date`, `proposal_lead`, `proposal`, `status`, `file_path`, `tags`, `html_content`, `related_to`, `img`) VALUES
(1, '2021-04-13 00:00:00', 'Lead 8', 'Two venues instead of one, for 50% the price', 'Draft', './proposal_lead5_04_13_2021', 'two-venues, big-event, events-for-this-month, pending-invoice', NULL, NULL, ''),
(2, '2021-06-01 23:40:02', 'none', 'Template of Proposal for projects and systems with support and document without images. HTML that can be modified completely.', 'Template', '/templates/proposals/template1.html', 'template, sample, without-images, business', '<html>\r\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\">\r\n    <link href=\"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap\" rel=\"stylesheet\">\r\n    <script src=\"../../js/fabric.min.js\"></script> \r\n    <style>\r\n        body {\r\n            /*font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;*/\r\n            font-family: \'Noto Sans JP\', sans-serif;\r\n            background-color: #f8f8f8;\r\n            font-size: 14px;\r\n        }\r\n        .container {\r\n            margin: 20px;\r\n            padding: 20px;\r\n        }\r\n        .row {\r\n            width: 100%;\r\n            display: block;\r\n        }\r\n        .col10 {\r\n            width: 10%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .col20 {\r\n            width: 20%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .center {\r\n            text-align: center;\r\n        }\r\n        .col30 {\r\n            width: 33%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .logo {\r\n            width: 200px;\r\n        }\r\n        .title {\r\n            font-size: 34px;\r\n        }\r\n        ul {\r\n            list-style: none;\r\n        }\r\n        .card {\r\n            background-color: #fff;\r\n            color: #333;\r\n            border-radius: 20px;\r\n            box-shadow: 5px 5px 5px #CCC;\r\n            padding: 30px;\r\n        }\r\n        .card2 {\r\n            background-color: #fff;\r\n            color: #333;\r\n            padding: 30px;\r\n            margin: 10px;\r\n        }\r\n        .header {\r\n            background-color:#fc6c37;\r\n            color: #fff;\r\n        }\r\n        .slogan {\r\n            font-size: 12px;\r\n            background-color: rgba(255,255,255,0.5);\r\n            padding: 7px;\r\n            margin: 5px;\r\n        }\r\n        .signature {\r\n            border-radius: 5px; \r\n            border: 1px solid #ccc;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n        }\r\n        input {\r\n            border-radius: 5px;\r\n            padding: 5px;\r\n            border: 0px;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n            margin: 5px;\r\n            font-family: \'Noto Sans JP\', sans-serif;\r\n            font-size: 14px;\r\n        }\r\n        .clear {\r\n            background-color: #fff;\r\n            border: 0px;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n            padding: 7px;\r\n            border-radius: 5px;\r\n        }\r\n        thead, tbody {\r\n            text-align: left;\r\n        }\r\n        th {\r\n            border-bottom: 2px #ccc solid;\r\n        }\r\n        th, tr, td {\r\n            padding: 5px;\r\n        }\r\n    </style>\r\n    <div class=\"container\">\r\n        ** Project can be switched to Systems, Servers, etc.\r\n        <div class=\"row header\">\r\n            <div class=\"col10\"><img src=\"../../images/templates/proposals/logo-sample1.png\" width=\"100px\" /></div>\r\n            <div class=\"col20 title center\">Proposal Template <span class=\"slogan\">A phrase or something to add in the proposal title</span></div>\r\n            <div class=\"col20\">\r\n                <ul>\r\n                    <li>Address 123, City, State</li>\r\n                    <li>+12919828912</li>\r\n                    <li>email@sample.email</li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col20\">\r\n                    <ul>\r\n                        <li>Prepared By</li>\r\n                        <li>Author Name Surname</li>\r\n                    </ul>\r\n            </div>\r\n            <div class=\"col20\">\r\n                <ul>\r\n                    <li>Prepared For</li>\r\n                    <li>Someone or Company</li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"card\">\r\n                <h3>Offer for [Client, Name]</h3>\r\n                <p>Thanks for reaching out to [Sender.Company] regarding your upcoming project. We specialize in [], and are excited to work with you to accomplish your goals. I’ve prepared this document as a more thorough introduction to [Sender.Company] as well as a detailed breakdown of the deliverables and pricing for your upcoming project.</p>\r\n                <h3>About [Sender.Company]</h3>\r\n                <p>[Sender.Company] is a firm specializing in []. Our specialized team [does] for private and public institutions around the world. We apply a complex well-proved approach to each project that allows us to complete the goals and projects on time and on budget without sacrificing features or quality.</p>\r\n                <h3>Our Approach</h3>\r\n                <p>[Sender.Company] applies a specialized framework to every project. This allows us to break projects down into distinct phases so that we can monitor progression and results along the way.</p>\r\n                <h3>Planning</h3>\r\n                <p>Every innovation begins in the planning phase. In this phase, we work to discover the needs, wants, and what the true objectives are. This allows us to thoroughly plan completely the system, avoiding costly delays and unforeseen challenges later on.</p>\r\n                <h3>Sample</h3>\r\n                <p>In this phase, we create prototypes and a simulation of your systems based on earlier discussions. By allowing you to review a visual representation of our understanding of your needs early on, we can further solidify your requirements and discover any additional needs or challenges that did not present themselves in the planning phase.</p>\r\n                <h3>Work in action (Build)</h3>\r\n                <p>In this phase, we begin the process of building your systems. We place a heavy emphasis on adhering to the technical and quality specifications laid out in the planning phase, and perform regular functional tests, which allows us to correct any problems during this instance rather than addressing them after completion.</p>\r\n                <h3>Test & Train (Configuration)</h3>\r\n                <p>We perform thorough testing on all sites prior to final launch. We simulate heavy stress to measure performance, and test various browsers, operating systems, and devices with the site or app to be sure that it is responsive and performs well across all platforms. We also perform training with your staff, so that they will be able to easily make minor adjustments or publish new features once your project (systems) is live.</p>\r\n                <h3>Launch</h3>\r\n                <p>The live launch of your project can be a stressful period. Even with thorough testing, unforeseen challenges can arise. That’s why the [Sender.Company] team provides full monitoring and support during the launch period. We stand ready to make sure that your launch is successful, and are ready to quickly address any issues that arise.</p>\r\n                <h3>Support</h3>\r\n                <p>Once your project launches successfully, you’ll still require a technical partner to support ongoing needs. We offer a wide variety of support services for our completed projects, including monitoring and optimization.</p>\r\n                <div class=\"row\">\r\n                    <div class=\"col20\">\r\n                        <div class=\"card2\">\r\n                            <h3>[Sender, Company]</h3>\r\n                            <p>[Signer Name, Surname]</p>\r\n                            <canvas id=\"sender_company\" class=\"signature\" width=\"200\" height=\"100\"></canvas>\r\n                            <input type=\"date\" class=\"input-date-signature\" /><button id=\"clear-canvas\" class=\"clear\">Clear</button>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col20\">\r\n                        <div class=\"card2\">\r\n                            <h3>[Client, Company]</h3>\r\n                            <p>[Signer Name, Surname]</p>\r\n                            <canvas id=\"client_company\" class=\"signature\" width=\"200\" height=\"100\"></canvas>\r\n                            <input type=\"date\" class=\"input-date-signature\" /><button id=\"clear-canvas2\" class=\"clear\">Clear</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"card\">\r\n                        <h3>Timeline</h3>\r\n                        <p>Here’s the process to be followed, according to preliminary analysis and our standard execution process:</p>\r\n                        <table>\r\n                            <thead>\r\n                                <th>Phase / Task</th>\r\n                                <th>Expected time for completion</th>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>06/26/2021 2:00 PM</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>06/26/2021 5:00 PM</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>06/27/2021 10:00 AM</td>\r\n                                </tr>    \r\n                            </tbody>\r\n                        </table>\r\n                        <p></p>\r\n                        <h3>Costs</h3>\r\n                        <p>Here’s how the costs associated break down:</p>\r\n                        <table>\r\n                            <thead>\r\n                                <th>Item</th>\r\n                                <th>Price / Amount</th>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>$ 0.00</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>$ 0.00</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>$ 0.00</td>\r\n                                </tr>    \r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <script>\r\n        (function() {\r\n        var $ = function(id){return document.getElementById(id)};\r\n\r\n        var canvas = this.__canvas = new fabric.Canvas(\'sender_company\', { isDrawingMode: true });\r\n        var canvas2 = this.__canvas = new fabric.Canvas(\'client_company\', { isDrawingMode: true });\r\n\r\n        fabric.Object.prototype.transparentCorners = false;\r\n\r\n        var drawingModeEl = \'Pencil\',\r\n            drawingOptionsEl = \'\',\r\n            drawingColorEl = \'#333\',\r\n            drawingShadowColorEl = \'\',\r\n            drawingLineWidthEl = 1,\r\n            drawingShadowWidth = 0,\r\n            drawingShadowOffset = 0,\r\n            clearEl = $(\'clear-canvas\'),\r\n            clearEl2 = $(\'clear-canvas2\');\r\n\r\n        clearEl.onclick = function() { canvas.clear() };\r\n        clearEl2.onclick = function() { canvas2.clear() };\r\n\r\n        if (canvas.freeDrawingBrush) {\r\n            canvas.freeDrawingBrush.color = \'#333\';\r\n            canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);\r\n            canvas.freeDrawingBrush.width = 1;\r\n            canvas.freeDrawingBrush.shadow = new fabric.Shadow({\r\n            blur: 0,\r\n            offsetX: 0,\r\n            offsetY: 0,\r\n            affectStroke: true,\r\n            color: \'#fff\',\r\n            });\r\n        }\r\n        if (canvas2.freeDrawingBrush) {\r\n            canvas2.freeDrawingBrush.color = \'#333\';\r\n            canvas2.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);\r\n            canvas2.freeDrawingBrush.width = 1;\r\n            canvas2.freeDrawingBrush.shadow = new fabric.Shadow({\r\n            blur: 0,\r\n            offsetX: 0,\r\n            offsetY: 0,\r\n            affectStroke: true,\r\n            color: \'#fff\',\r\n            });\r\n        }\r\n        })();\r\n    </script>\r\n</html>', NULL, '/images/templates/proposals/template1.png'),
(3, '2021-06-01 23:40:02', 'none', 'Template for project or systems, with images. HTML that can be completely modified.', 'Template', '/templates/proposals/template2.html', 'template, business, with-images', '<html>\r\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\">\r\n    <link href=\"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap\" rel=\"stylesheet\">\r\n    <script src=\"../../js/fabric.min.js\"></script> \r\n    <style>\r\n        body {\r\n            /*font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;*/\r\n            font-family: \'Noto Sans JP\', sans-serif;\r\n            background-color: #f8f8f8;\r\n            font-size: 14px;\r\n        }\r\n        .container {\r\n            margin: 20px;\r\n            padding: 20px;\r\n        }\r\n        .row {\r\n            width: 100%;\r\n            display: block;\r\n        }\r\n        .col10 {\r\n            width: 10%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .col20 {\r\n            width: 20%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .center {\r\n            text-align: center;\r\n        }\r\n        .col30 {\r\n            width: 33%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .logo {\r\n            width: 200px;\r\n        }\r\n        .title {\r\n            font-size: 34px;\r\n        }\r\n        ul {\r\n            list-style: none;\r\n        }\r\n        .card {\r\n            background-color: #fff;\r\n            color: #333;\r\n            border-radius: 20px;\r\n            box-shadow: 5px 5px 5px #CCC;\r\n            padding: 30px;\r\n        }\r\n        .card2 {\r\n            background-color: #fff;\r\n            color: #333;\r\n            padding: 30px;\r\n            margin: 10px;\r\n        }\r\n        .header {\r\n            background:url(\"../../images/templates/proposals/img1.jpg\");\r\n            color: #fff;\r\n            padding-top: 70px;\r\n            padding-bottom: 70px;\r\n        }\r\n        .slogan {\r\n            font-size: 12px;\r\n            background-color: rgba(255,255,255,0.5);\r\n            padding: 7px;\r\n            margin: 5px;\r\n        }\r\n        .signature {\r\n            border-radius: 5px; \r\n            border: 1px solid #ccc;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n        }\r\n        input {\r\n            border-radius: 5px;\r\n            padding: 5px;\r\n            border: 0px;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n            margin: 5px;\r\n            font-family: \'Noto Sans JP\', sans-serif;\r\n            font-size: 14px;\r\n        }\r\n        .clear {\r\n            background-color: #fff;\r\n            border: 0px;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n            padding: 7px;\r\n            border-radius: 5px;\r\n        }\r\n        thead, tbody {\r\n            text-align: left;\r\n        }\r\n        th {\r\n            border-bottom: 2px #ccc solid;\r\n        }\r\n        th, tr, td {\r\n            padding: 5px;\r\n        }\r\n        .middle-line {\r\n            height: 100px;\r\n            background:url(\"../../images/templates/proposals/img1.jpg\");\r\n            background-size: 100% auto;\r\n            padding-top: 100px;\r\n            padding-bottom: 100px;\r\n        }\r\n        .span-title {\r\n            background: rgba(255,255,255,0.5);\r\n            padding: 10px;\r\n            font-size: 34px;\r\n            vertical-align: middle;\r\n            margin-top: 30%;\r\n        }\r\n    </style>\r\n    <div class=\"container\">\r\n        ** Project can be switched to Systems, Servers, etc.\r\n        <div class=\"row header\">\r\n            <div class=\"col10\"><img src=\"../../images/templates/proposals/logo-sample2.png\" width=\"100px\" /></div>\r\n            <div class=\"col20 title center\">Proposal Template <span class=\"slogan\">A phrase or something to add in the proposal title</span></div>\r\n            <div class=\"col20\">\r\n                <ul>\r\n                    <li>Address 123, City, State</li>\r\n                    <li>+12919828912</li>\r\n                    <li>email@sample.email</li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col20\">\r\n                    <ul>\r\n                        <li>Prepared By</li>\r\n                        <li>Author Name Surname</li>\r\n                    </ul>\r\n            </div>\r\n            <div class=\"col20\">\r\n                <ul>\r\n                    <li>Prepared For</li>\r\n                    <li>Someone or Company</li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"card\">\r\n                <h3>Offer for [Client, Name]</h3>\r\n                <p>Thanks for reaching out to [Sender.Company] regarding your upcoming project. We specialize in [], and are excited to work with you to accomplish your goals. I’ve prepared this document as a more thorough introduction to [Sender.Company] as well as a detailed breakdown of the deliverables and pricing for your upcoming project.</p>\r\n                <h3>About [Sender.Company]</h3>\r\n                <p>[Sender.Company] is a firm specializing in []. Our specialized team [does] for private and public institutions around the world. We apply a complex well-proved approach to each project that allows us to complete the goals and projects on time and on budget without sacrificing features or quality.</p>\r\n                <h3>Our Approach</h3>\r\n                <p>[Sender.Company] applies a specialized framework to every project. This allows us to break projects down into distinct phases so that we can monitor progression and results along the way.</p>\r\n                <h3>Planning</h3>\r\n                <p>Every innovation begins in the planning phase. In this phase, we work to discover the needs, wants, and what the true objectives are. This allows us to thoroughly plan completely the system, avoiding costly delays and unforeseen challenges later on.</p>\r\n                <h3>Sample</h3>\r\n                <p>In this phase, we create prototypes and a simulation of your systems based on earlier discussions. By allowing you to review a visual representation of our understanding of your needs early on, we can further solidify your requirements and discover any additional needs or challenges that did not present themselves in the planning phase.</p>\r\n                <h3>Work in action (Build)</h3>\r\n                <p>In this phase, we begin the process of building your systems. We place a heavy emphasis on adhering to the technical and quality specifications laid out in the planning phase, and perform regular functional tests, which allows us to correct any problems during this instance rather than addressing them after completion.</p>\r\n                <h3>Test & Train (Configuration)</h3>\r\n                <p>We perform thorough testing on all sites prior to final launch. We simulate heavy stress to measure performance, and test various browsers, operating systems, and devices with the site or app to be sure that it is responsive and performs well across all platforms. We also perform training with your staff, so that they will be able to easily make minor adjustments or publish new features once your project (systems) is live.</p>\r\n                <h3>Launch</h3>\r\n                <p>The live launch of your project can be a stressful period. Even with thorough testing, unforeseen challenges can arise. That’s why the [Sender.Company] team provides full monitoring and support during the launch period. We stand ready to make sure that your launch is successful, and are ready to quickly address any issues that arise.</p>\r\n                <h3>Support</h3>\r\n                <p>Once your project launches successfully, you’ll still require a technical partner to support ongoing needs. We offer a wide variety of support services for our completed projects, including monitoring and optimization.</p>\r\n                <div class=\"row\">\r\n                    <div class=\"col20\">\r\n                        <div class=\"card2\">\r\n                            <h3>[Sender, Company]</h3>\r\n                            <p>[Signer Name, Surname]</p>\r\n                            <canvas id=\"sender_company\" class=\"signature\" width=\"200\" height=\"100\"></canvas>\r\n                            <input type=\"date\" class=\"input-date-signature\" /><button id=\"clear-canvas\" class=\"clear\">Clear</button>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col20\">\r\n                        <div class=\"card2\">\r\n                            <h3>[Client, Company]</h3>\r\n                            <p>[Signer Name, Surname]</p>\r\n                            <canvas id=\"client_company\" class=\"signature\" width=\"200\" height=\"100\"></canvas>\r\n                            <input type=\"date\" class=\"input-date-signature\" /><button id=\"clear-canvas2\" class=\"clear\">Clear</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row middle-line\"><span class=\"span-title\">Proposal Break Down</span></div>\r\n                <div class=\"row\">\r\n                    <div class=\"card\">\r\n                        <h3>Timeline</h3>\r\n                        <p>Here’s the process to be followed, according to preliminary analysis and our standard execution process:</p>\r\n                        <table>\r\n                            <thead>\r\n                                <th>Phase / Task</th>\r\n                                <th>Expected time for completion</th>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>06/26/2021 2:00 PM</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>06/26/2021 5:00 PM</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>06/27/2021 10:00 AM</td>\r\n                                </tr>    \r\n                            </tbody>\r\n                        </table>\r\n                        <p></p>\r\n                        <h3>Costs</h3>\r\n                        <p>Here’s how the costs associated break down:</p>\r\n                        <table>\r\n                            <thead>\r\n                                <th>Item</th>\r\n                                <th>Price / Amount</th>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>$ 0.00</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>$ 0.00</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>$ 0.00</td>\r\n                                </tr>    \r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <script>\r\n        (function() {\r\n        var $ = function(id){return document.getElementById(id)};\r\n\r\n        var canvas = this.__canvas = new fabric.Canvas(\'sender_company\', { isDrawingMode: true });\r\n        var canvas2 = this.__canvas = new fabric.Canvas(\'client_company\', { isDrawingMode: true });\r\n\r\n        fabric.Object.prototype.transparentCorners = false;\r\n\r\n        var drawingModeEl = \'Pencil\',\r\n            drawingOptionsEl = \'\',\r\n            drawingColorEl = \'#333\',\r\n            drawingShadowColorEl = \'\',\r\n            drawingLineWidthEl = 1,\r\n            drawingShadowWidth = 0,\r\n            drawingShadowOffset = 0,\r\n            clearEl = $(\'clear-canvas\'),\r\n            clearEl2 = $(\'clear-canvas2\');\r\n\r\n        clearEl.onclick = function() { canvas.clear() };\r\n        clearEl2.onclick = function() { canvas2.clear() };\r\n\r\n        if (canvas.freeDrawingBrush) {\r\n            canvas.freeDrawingBrush.color = \'#333\';\r\n            canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);\r\n            canvas.freeDrawingBrush.width = 1;\r\n            canvas.freeDrawingBrush.shadow = new fabric.Shadow({\r\n            blur: 0,\r\n            offsetX: 0,\r\n            offsetY: 0,\r\n            affectStroke: true,\r\n            color: \'#fff\',\r\n            });\r\n        }\r\n        if (canvas2.freeDrawingBrush) {\r\n            canvas2.freeDrawingBrush.color = \'#333\';\r\n            canvas2.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);\r\n            canvas2.freeDrawingBrush.width = 1;\r\n            canvas2.freeDrawingBrush.shadow = new fabric.Shadow({\r\n            blur: 0,\r\n            offsetX: 0,\r\n            offsetY: 0,\r\n            affectStroke: true,\r\n            color: \'#fff\',\r\n            });\r\n        }\r\n        })();\r\n    </script>\r\n</html>', NULL, '/images/templates/proposals/template2.png'),
(4, '2021-06-01 23:43:44', 'none', 'Proposal for Events. HTML completely open to modifications according to needs.', 'Template', '/templates/proposals/template3.html', 'template, events, with-images', '<html>\r\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\">\r\n    <link href=\"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap\" rel=\"stylesheet\">\r\n    <script src=\"../../js/fabric.min.js\"></script> \r\n    <style>\r\n        body {\r\n            /*font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;*/\r\n            font-family: \'Noto Sans JP\', sans-serif;\r\n            background-color: #f8f8f8;\r\n            font-size: 14px;\r\n        }\r\n        .container {\r\n            margin: 20px;\r\n            padding: 20px;\r\n        }\r\n        .row {\r\n            width: 100%;\r\n            display: block;\r\n        }\r\n        .col10 {\r\n            width: 10%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .col20 {\r\n            width: 20%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .center {\r\n            text-align: center;\r\n        }\r\n        .col30 {\r\n            width: 38%;\r\n            display: inline-block;\r\n            vertical-align: top;\r\n        }\r\n        .col60 {\r\n            width: 60%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .logo {\r\n            width: 200px;\r\n        }\r\n        .title {\r\n            font-size: 34px;\r\n        }\r\n        ul {\r\n            list-style: none;\r\n        }\r\n        .card {\r\n            background-color: #fff;\r\n            color: #333;\r\n            border-radius: 20px;\r\n            box-shadow: 5px 5px 5px #CCC;\r\n            padding: 30px;\r\n        }\r\n        .card2 {\r\n            background-color: #fff;\r\n            color: #333;\r\n            padding: 30px;\r\n            margin: 10px;\r\n        }\r\n        .header {\r\n            background-color:#0d6efd;\r\n            color: #fff;\r\n        }\r\n        .slogan {\r\n            font-size: 12px;\r\n            background-color: rgba(255,255,255,0.5);\r\n            padding: 7px;\r\n            margin: 5px;\r\n        }\r\n        .signature {\r\n            border-radius: 5px; \r\n            border: 1px solid #ccc;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n        }\r\n        input {\r\n            border-radius: 5px;\r\n            padding: 5px;\r\n            border: 0px;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n            margin: 5px;\r\n            font-family: \'Noto Sans JP\', sans-serif;\r\n            font-size: 14px;\r\n        }\r\n        .clear {\r\n            background-color: #fff;\r\n            border: 0px;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n            padding: 7px;\r\n            border-radius: 5px;\r\n        }\r\n        thead, tbody {\r\n            text-align: left;\r\n        }\r\n        th {\r\n            border-bottom: 2px #ccc solid;\r\n        }\r\n        th, tr, td {\r\n            padding: 5px;\r\n        }\r\n        .pre-header {\r\n            background: url(\"../../images/templates/proposals/events3.jpg\");\r\n            background-size: 100% auto;\r\n            height: 300px;\r\n        }\r\n        .img-square {\r\n            background: url(\"../../images/templates/proposals/events1.jpg\");\r\n            background-size: auto 100%;\r\n            height: 100%;\r\n        }\r\n    </style>\r\n    <div class=\"container\">\r\n        <div class=\"row pre-header\"></div>\r\n        <div class=\"row header\">\r\n            <div class=\"col10\"><img src=\"../../images/templates/proposals/logo-sample3.png\" width=\"100px\" /></div>\r\n            <div class=\"col20 title center\">Event Proposal <span class=\"slogan\">A phrase or something to add in the proposal title</span></div>\r\n            <div class=\"col20\">\r\n                <ul>\r\n                    <li>Address 123, City, State</li>\r\n                    <li>+12919828912</li>\r\n                    <li>email@sample.email</li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col20\">\r\n                    <ul>\r\n                        <li>Prepared By</li>\r\n                        <li>Author Name Surname</li>\r\n                    </ul>\r\n            </div>\r\n            <div class=\"col20\">\r\n                <ul>\r\n                    <li>Prepared For</li>\r\n                    <li>Someone or Company</li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"card\">\r\n                <div class=\"col60\">\r\n                    <h3>Offer for [Client, Name]</h3>\r\n                    <p>Thanks for reaching out to [Sender.Company] regarding your upcoming event.</p>\r\n                    <p>This is the first step in having your special event take place in [Venue].</p>\r\n                    <p>This form will give us the information we need to determine if your event is feasible and can proceed through. The objective is to protect the public’s health, safety and welfare by ensuring that events are compatible in size and type of use with the site;</p>\r\n                    <p>impacts on neighbors and others are managed; adequate services are provided for the event and the event do not interfere with the place regulations; mechanisms are available for cost recovery and use charges, while not unduly impacting the viability of events.</p> \r\n                    <p>Please complete this two page interactive proposal and return it to the address above mentioned. We do our best to contact you within five business days regarding the status of the event. Once the proposal is agreed upon, then we can begin to plan for the event to take place at the site accorded.</p>\r\n                    <h3>Event Location</h3>\r\n                    <p>Designated venue: [Venue]</p>\r\n                    <h3>Event Information</h3>\r\n                    <p>Event Type: [Formal / Informal]</p>\r\n                    <p>Number of expected attendees: [Number]</p>\r\n                    <p>Rain is acceptable: [Yes/No]</p>\r\n                    <p>Event Start Date: [year/month/day]</p>\r\n                    <p>Event Start Time: [hour]</p>\r\n                    <p>Event End Date: [year/month/day]</p>\r\n                    <p>Event End Time: [hour]</p>\r\n                    <p>Budget: [From $0 to $100]</p>\r\n                    <h3>Event Requisites</h3>\r\n                    <p>[Requisites]</p>\r\n                    <h3>Event Description and/or Comments</h3>\r\n                    <p>[Details]</p>\r\n                </div>\r\n                <div class=\"col30 img-square\"></div>\r\n                <h3>Proposed Terms and Costs</h3>\r\n                    <p>..........</p>\r\n                <div class=\"row\">\r\n                    <div class=\"col20\">\r\n                        <div class=\"card2\">\r\n                            <h3>[Sender, Company]</h3>\r\n                            <p>[Signer Name, Surname]</p>\r\n                            <canvas id=\"sender_company\" class=\"signature\" width=\"200\" height=\"100\"></canvas>\r\n                            <input type=\"date\" class=\"input-date-signature\" /><button id=\"clear-canvas\" class=\"clear\">Clear</button>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col20\">\r\n                        <div class=\"card2\">\r\n                            <h3>[Client, Company]</h3>\r\n                            <p>[Signer Name, Surname]</p>\r\n                            <canvas id=\"client_company\" class=\"signature\" width=\"200\" height=\"100\"></canvas>\r\n                            <input type=\"date\" class=\"input-date-signature\" /><button id=\"clear-canvas2\" class=\"clear\">Clear</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                \r\n            </div>\r\n        </div>\r\n    </div>\r\n    <script>\r\n        (function() {\r\n        var $ = function(id){return document.getElementById(id)};\r\n\r\n        var canvas = this.__canvas = new fabric.Canvas(\'sender_company\', { isDrawingMode: true });\r\n        var canvas2 = this.__canvas = new fabric.Canvas(\'client_company\', { isDrawingMode: true });\r\n\r\n        fabric.Object.prototype.transparentCorners = false;\r\n\r\n        var drawingModeEl = \'Pencil\',\r\n            drawingOptionsEl = \'\',\r\n            drawingColorEl = \'#333\',\r\n            drawingShadowColorEl = \'\',\r\n            drawingLineWidthEl = 1,\r\n            drawingShadowWidth = 0,\r\n            drawingShadowOffset = 0,\r\n            clearEl = $(\'clear-canvas\'),\r\n            clearEl2 = $(\'clear-canvas2\');\r\n\r\n        clearEl.onclick = function() { canvas.clear() };\r\n        clearEl2.onclick = function() { canvas2.clear() };\r\n\r\n        if (canvas.freeDrawingBrush) {\r\n            canvas.freeDrawingBrush.color = \'#333\';\r\n            canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);\r\n            canvas.freeDrawingBrush.width = 1;\r\n            canvas.freeDrawingBrush.shadow = new fabric.Shadow({\r\n            blur: 0,\r\n            offsetX: 0,\r\n            offsetY: 0,\r\n            affectStroke: true,\r\n            color: \'#fff\',\r\n            });\r\n        }\r\n        if (canvas2.freeDrawingBrush) {\r\n            canvas2.freeDrawingBrush.color = \'#333\';\r\n            canvas2.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);\r\n            canvas2.freeDrawingBrush.width = 1;\r\n            canvas2.freeDrawingBrush.shadow = new fabric.Shadow({\r\n            blur: 0,\r\n            offsetX: 0,\r\n            offsetY: 0,\r\n            affectStroke: true,\r\n            color: \'#fff\',\r\n            });\r\n        }\r\n        })();\r\n    </script>\r\n</html>', NULL, '/images/templates/proposals/template3.png'),
(6, '9999-01-01 00:00:00', 'none', 'Testing new template', 'Template', '/templates/proposals/proposal_template_9999-01-01.html', 'template,new,test', '<h1>Titulo<br data-mce-bogus=\"1\"></h1><p>Texto de la nota<br data-mce-bogus=\"1\"></p>', NULL, '/uploads/img6.jpg'),
(7, '9999-01-01 00:00:00', 'none', 'Draft 1623032145504', 'Draft', '/public/templates/proposals/Draft 1623032145504.html', 'draft,saved-from-editor', '<h1>My first draft</h1>\r\n<p>Testing how saving from the editor works</p>', NULL, '/uploads/placeholder.jpg');
INSERT INTO `proposals` (`id`, `proposal_date`, `proposal_lead`, `proposal`, `status`, `file_path`, `tags`, `html_content`, `related_to`, `img`) VALUES
(9, '2021-06-01 23:40:02', 'none', 'Another clone for testing', 'Template', '/templates/proposals/template1.html', 'template, sample, without-images, business', '<html>\r\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\">\r\n    <link href=\"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap\" rel=\"stylesheet\">\r\n    <script src=\"../../js/fabric.min.js\"></script> \r\n    <style>\r\n        body {\r\n            /*font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;*/\r\n            font-family: \'Noto Sans JP\', sans-serif;\r\n            background-color: #f8f8f8;\r\n            font-size: 14px;\r\n        }\r\n        .container {\r\n            margin: 20px;\r\n            padding: 20px;\r\n        }\r\n        .row {\r\n            width: 100%;\r\n            display: block;\r\n        }\r\n        .col10 {\r\n            width: 10%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .col20 {\r\n            width: 20%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .center {\r\n            text-align: center;\r\n        }\r\n        .col30 {\r\n            width: 33%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .logo {\r\n            width: 200px;\r\n        }\r\n        .title {\r\n            font-size: 34px;\r\n        }\r\n        ul {\r\n            list-style: none;\r\n        }\r\n        .card {\r\n            background-color: #fff;\r\n            color: #333;\r\n            border-radius: 20px;\r\n            box-shadow: 5px 5px 5px #CCC;\r\n            padding: 30px;\r\n        }\r\n        .card2 {\r\n            background-color: #fff;\r\n            color: #333;\r\n            padding: 30px;\r\n            margin: 10px;\r\n        }\r\n        .header {\r\n            background-color:#fc6c37;\r\n            color: #fff;\r\n        }\r\n        .slogan {\r\n            font-size: 12px;\r\n            background-color: rgba(255,255,255,0.5);\r\n            padding: 7px;\r\n            margin: 5px;\r\n        }\r\n        .signature {\r\n            border-radius: 5px; \r\n            border: 1px solid #ccc;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n        }\r\n        input {\r\n            border-radius: 5px;\r\n            padding: 5px;\r\n            border: 0px;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n            margin: 5px;\r\n            font-family: \'Noto Sans JP\', sans-serif;\r\n            font-size: 14px;\r\n        }\r\n        .clear {\r\n            background-color: #fff;\r\n            border: 0px;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n            padding: 7px;\r\n            border-radius: 5px;\r\n        }\r\n        thead, tbody {\r\n            text-align: left;\r\n        }\r\n        th {\r\n            border-bottom: 2px #ccc solid;\r\n        }\r\n        th, tr, td {\r\n            padding: 5px;\r\n        }\r\n    </style>\r\n    <div class=\"container\">\r\n        ** Project can be switched to Systems, Servers, etc.\r\n        <div class=\"row header\">\r\n            <div class=\"col10\"><img src=\"../../images/templates/proposals/logo-sample1.png\" width=\"100px\" /></div>\r\n            <div class=\"col20 title center\">Proposal Template <span class=\"slogan\">A phrase or something to add in the proposal title</span></div>\r\n            <div class=\"col20\">\r\n                <ul>\r\n                    <li>Address 123, City, State</li>\r\n                    <li>+12919828912</li>\r\n                    <li>email@sample.email</li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col20\">\r\n                    <ul>\r\n                        <li>Prepared By</li>\r\n                        <li>Author Name Surname</li>\r\n                    </ul>\r\n            </div>\r\n            <div class=\"col20\">\r\n                <ul>\r\n                    <li>Prepared For</li>\r\n                    <li>Someone or Company</li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"card\">\r\n                <h3>Offer for [Client, Name]</h3>\r\n                <p>Thanks for reaching out to [Sender.Company] regarding your upcoming project. We specialize in [], and are excited to work with you to accomplish your goals. I’ve prepared this document as a more thorough introduction to [Sender.Company] as well as a detailed breakdown of the deliverables and pricing for your upcoming project.</p>\r\n                <h3>About [Sender.Company]</h3>\r\n                <p>[Sender.Company] is a firm specializing in []. Our specialized team [does] for private and public institutions around the world. We apply a complex well-proved approach to each project that allows us to complete the goals and projects on time and on budget without sacrificing features or quality.</p>\r\n                <h3>Our Approach</h3>\r\n                <p>[Sender.Company] applies a specialized framework to every project. This allows us to break projects down into distinct phases so that we can monitor progression and results along the way.</p>\r\n                <h3>Planning</h3>\r\n                <p>Every innovation begins in the planning phase. In this phase, we work to discover the needs, wants, and what the true objectives are. This allows us to thoroughly plan completely the system, avoiding costly delays and unforeseen challenges later on.</p>\r\n                <h3>Sample</h3>\r\n                <p>In this phase, we create prototypes and a simulation of your systems based on earlier discussions. By allowing you to review a visual representation of our understanding of your needs early on, we can further solidify your requirements and discover any additional needs or challenges that did not present themselves in the planning phase.</p>\r\n                <h3>Work in action (Build)</h3>\r\n                <p>In this phase, we begin the process of building your systems. We place a heavy emphasis on adhering to the technical and quality specifications laid out in the planning phase, and perform regular functional tests, which allows us to correct any problems during this instance rather than addressing them after completion.</p>\r\n                <h3>Test & Train (Configuration)</h3>\r\n                <p>We perform thorough testing on all sites prior to final launch. We simulate heavy stress to measure performance, and test various browsers, operating systems, and devices with the site or app to be sure that it is responsive and performs well across all platforms. We also perform training with your staff, so that they will be able to easily make minor adjustments or publish new features once your project (systems) is live.</p>\r\n                <h3>Launch</h3>\r\n                <p>The live launch of your project can be a stressful period. Even with thorough testing, unforeseen challenges can arise. That’s why the [Sender.Company] team provides full monitoring and support during the launch period. We stand ready to make sure that your launch is successful, and are ready to quickly address any issues that arise.</p>\r\n                <h3>Support</h3>\r\n                <p>Once your project launches successfully, you’ll still require a technical partner to support ongoing needs. We offer a wide variety of support services for our completed projects, including monitoring and optimization.</p>\r\n                <div class=\"row\">\r\n                    <div class=\"col20\">\r\n                        <div class=\"card2\">\r\n                            <h3>[Sender, Company]</h3>\r\n                            <p>[Signer Name, Surname]</p>\r\n                            <canvas id=\"sender_company\" class=\"signature\" width=\"200\" height=\"100\"></canvas>\r\n                            <input type=\"date\" class=\"input-date-signature\" /><button id=\"clear-canvas\" class=\"clear\">Clear</button>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col20\">\r\n                        <div class=\"card2\">\r\n                            <h3>[Client, Company]</h3>\r\n                            <p>[Signer Name, Surname]</p>\r\n                            <canvas id=\"client_company\" class=\"signature\" width=\"200\" height=\"100\"></canvas>\r\n                            <input type=\"date\" class=\"input-date-signature\" /><button id=\"clear-canvas2\" class=\"clear\">Clear</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"card\">\r\n                        <h3>Timeline</h3>\r\n                        <p>Here’s the process to be followed, according to preliminary analysis and our standard execution process:</p>\r\n                        <table>\r\n                            <thead>\r\n                                <th>Phase / Task</th>\r\n                                <th>Expected time for completion</th>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>06/26/2021 2:00 PM</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>06/26/2021 5:00 PM</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>06/27/2021 10:00 AM</td>\r\n                                </tr>    \r\n                            </tbody>\r\n                        </table>\r\n                        <p></p>\r\n                        <h3>Costs</h3>\r\n                        <p>Here’s how the costs associated break down:</p>\r\n                        <table>\r\n                            <thead>\r\n                                <th>Item</th>\r\n                                <th>Price / Amount</th>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>$ 0.00</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>$ 0.00</td>\r\n                                </tr>\r\n                                <tr>\r\n                                    <td>Configuration of samples and templates</td>\r\n                                    <td>$ 0.00</td>\r\n                                </tr>    \r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <script>\r\n        (function() {\r\n        var $ = function(id){return document.getElementById(id)};\r\n\r\n        var canvas = this.__canvas = new fabric.Canvas(\'sender_company\', { isDrawingMode: true });\r\n        var canvas2 = this.__canvas = new fabric.Canvas(\'client_company\', { isDrawingMode: true });\r\n\r\n        fabric.Object.prototype.transparentCorners = false;\r\n\r\n        var drawingModeEl = \'Pencil\',\r\n            drawingOptionsEl = \'\',\r\n            drawingColorEl = \'#333\',\r\n            drawingShadowColorEl = \'\',\r\n            drawingLineWidthEl = 1,\r\n            drawingShadowWidth = 0,\r\n            drawingShadowOffset = 0,\r\n            clearEl = $(\'clear-canvas\'),\r\n            clearEl2 = $(\'clear-canvas2\');\r\n\r\n        clearEl.onclick = function() { canvas.clear() };\r\n        clearEl2.onclick = function() { canvas2.clear() };\r\n\r\n        if (canvas.freeDrawingBrush) {\r\n            canvas.freeDrawingBrush.color = \'#333\';\r\n            canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);\r\n            canvas.freeDrawingBrush.width = 1;\r\n            canvas.freeDrawingBrush.shadow = new fabric.Shadow({\r\n            blur: 0,\r\n            offsetX: 0,\r\n            offsetY: 0,\r\n            affectStroke: true,\r\n            color: \'#fff\',\r\n            });\r\n        }\r\n        if (canvas2.freeDrawingBrush) {\r\n            canvas2.freeDrawingBrush.color = \'#333\';\r\n            canvas2.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);\r\n            canvas2.freeDrawingBrush.width = 1;\r\n            canvas2.freeDrawingBrush.shadow = new fabric.Shadow({\r\n            blur: 0,\r\n            offsetX: 0,\r\n            offsetY: 0,\r\n            affectStroke: true,\r\n            color: \'#fff\',\r\n            });\r\n        }\r\n        })();\r\n    </script>\r\n</html>', NULL, '/images/templates/proposals/template1.png'),
(15, '2021-06-01 23:43:44', 'none', 'Super ultra test!!', 'Template', '/templates/proposals/template3.html', 'template, events, with-images', '<html>\r\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\">\r\n    <link href=\"https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap\" rel=\"stylesheet\">\r\n    <script src=\"../../js/fabric.min.js\"></script> \r\n    <style>\r\n        body {\r\n            /*font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;*/\r\n            font-family: \'Noto Sans JP\', sans-serif;\r\n            background-color: #f8f8f8;\r\n            font-size: 14px;\r\n        }\r\n        .container {\r\n            margin: 20px;\r\n            padding: 20px;\r\n        }\r\n        .row {\r\n            width: 100%;\r\n            display: block;\r\n        }\r\n        .col10 {\r\n            width: 10%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .col20 {\r\n            width: 20%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .center {\r\n            text-align: center;\r\n        }\r\n        .col30 {\r\n            width: 38%;\r\n            display: inline-block;\r\n            vertical-align: top;\r\n        }\r\n        .col60 {\r\n            width: 60%;\r\n            display: inline-block;\r\n            vertical-align: middle;\r\n        }\r\n        .logo {\r\n            width: 200px;\r\n        }\r\n        .title {\r\n            font-size: 34px;\r\n        }\r\n        ul {\r\n            list-style: none;\r\n        }\r\n        .card {\r\n            background-color: #fff;\r\n            color: #333;\r\n            border-radius: 20px;\r\n            box-shadow: 5px 5px 5px #CCC;\r\n            padding: 30px;\r\n        }\r\n        .card2 {\r\n            background-color: #fff;\r\n            color: #333;\r\n            padding: 30px;\r\n            margin: 10px;\r\n        }\r\n        .header {\r\n            background-color:#0d6efd;\r\n            color: #fff;\r\n        }\r\n        .slogan {\r\n            font-size: 12px;\r\n            background-color: rgba(255,255,255,0.5);\r\n            padding: 7px;\r\n            margin: 5px;\r\n        }\r\n        .signature {\r\n            border-radius: 5px; \r\n            border: 1px solid #ccc;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n        }\r\n        input {\r\n            border-radius: 5px;\r\n            padding: 5px;\r\n            border: 0px;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n            margin: 5px;\r\n            font-family: \'Noto Sans JP\', sans-serif;\r\n            font-size: 14px;\r\n        }\r\n        .clear {\r\n            background-color: #fff;\r\n            border: 0px;\r\n            box-shadow: 1px 1px 1px #ccc;\r\n            padding: 7px;\r\n            border-radius: 5px;\r\n        }\r\n        thead, tbody {\r\n            text-align: left;\r\n        }\r\n        th {\r\n            border-bottom: 2px #ccc solid;\r\n        }\r\n        th, tr, td {\r\n            padding: 5px;\r\n        }\r\n        .pre-header {\r\n            background: url(\"../../images/templates/proposals/events3.jpg\");\r\n            background-size: 100% auto;\r\n            height: 300px;\r\n        }\r\n        .img-square {\r\n            background: url(\"../../images/templates/proposals/events1.jpg\");\r\n            background-size: auto 100%;\r\n            height: 100%;\r\n        }\r\n    </style>\r\n    <div class=\"container\">\r\n        <div class=\"row pre-header\"></div>\r\n        <div class=\"row header\">\r\n            <div class=\"col10\"><img src=\"../../images/templates/proposals/logo-sample3.png\" width=\"100px\" /></div>\r\n            <div class=\"col20 title center\">Event Proposal <span class=\"slogan\">A phrase or something to add in the proposal title</span></div>\r\n            <div class=\"col20\">\r\n                <ul>\r\n                    <li>Address 123, City, State</li>\r\n                    <li>+12919828912</li>\r\n                    <li>email@sample.email</li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"col20\">\r\n                    <ul>\r\n                        <li>Prepared By</li>\r\n                        <li>Author Name Surname</li>\r\n                    </ul>\r\n            </div>\r\n            <div class=\"col20\">\r\n                <ul>\r\n                    <li>Prepared For</li>\r\n                    <li>Someone or Company</li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"card\">\r\n                <div class=\"col60\">\r\n                    <h3>Offer for [Client, Name]</h3>\r\n                    <p>Thanks for reaching out to [Sender.Company] regarding your upcoming event.</p>\r\n                    <p>This is the first step in having your special event take place in [Venue].</p>\r\n                    <p>This form will give us the information we need to determine if your event is feasible and can proceed through. The objective is to protect the public’s health, safety and welfare by ensuring that events are compatible in size and type of use with the site;</p>\r\n                    <p>impacts on neighbors and others are managed; adequate services are provided for the event and the event do not interfere with the place regulations; mechanisms are available for cost recovery and use charges, while not unduly impacting the viability of events.</p> \r\n                    <p>Please complete this two page interactive proposal and return it to the address above mentioned. We do our best to contact you within five business days regarding the status of the event. Once the proposal is agreed upon, then we can begin to plan for the event to take place at the site accorded.</p>\r\n                    <h3>Event Location</h3>\r\n                    <p>Designated venue: [Venue]</p>\r\n                    <h3>Event Information</h3>\r\n                    <p>Event Type: [Formal / Informal]</p>\r\n                    <p>Number of expected attendees: [Number]</p>\r\n                    <p>Rain is acceptable: [Yes/No]</p>\r\n                    <p>Event Start Date: [year/month/day]</p>\r\n                    <p>Event Start Time: [hour]</p>\r\n                    <p>Event End Date: [year/month/day]</p>\r\n                    <p>Event End Time: [hour]</p>\r\n                    <p>Budget: [From $0 to $100]</p>\r\n                    <h3>Event Requisites</h3>\r\n                    <p>[Requisites]</p>\r\n                    <h3>Event Description and/or Comments</h3>\r\n                    <p>[Details]</p>\r\n                </div>\r\n                <div class=\"col30 img-square\"></div>\r\n                <h3>Proposed Terms and Costs</h3>\r\n                    <p>..........</p>\r\n                <div class=\"row\">\r\n                    <div class=\"col20\">\r\n                        <div class=\"card2\">\r\n                            <h3>[Sender, Company]</h3>\r\n                            <p>[Signer Name, Surname]</p>\r\n                            <canvas id=\"sender_company\" class=\"signature\" width=\"200\" height=\"100\"></canvas>\r\n                            <input type=\"date\" class=\"input-date-signature\" /><button id=\"clear-canvas\" class=\"clear\">Clear</button>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col20\">\r\n                        <div class=\"card2\">\r\n                            <h3>[Client, Company]</h3>\r\n                            <p>[Signer Name, Surname]</p>\r\n                            <canvas id=\"client_company\" class=\"signature\" width=\"200\" height=\"100\"></canvas>\r\n                            <input type=\"date\" class=\"input-date-signature\" /><button id=\"clear-canvas2\" class=\"clear\">Clear</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                \r\n            </div>\r\n        </div>\r\n    </div>\r\n    <script>\r\n        (function() {\r\n        var $ = function(id){return document.getElementById(id)};\r\n\r\n        var canvas = this.__canvas = new fabric.Canvas(\'sender_company\', { isDrawingMode: true });\r\n        var canvas2 = this.__canvas = new fabric.Canvas(\'client_company\', { isDrawingMode: true });\r\n\r\n        fabric.Object.prototype.transparentCorners = false;\r\n\r\n        var drawingModeEl = \'Pencil\',\r\n            drawingOptionsEl = \'\',\r\n            drawingColorEl = \'#333\',\r\n            drawingShadowColorEl = \'\',\r\n            drawingLineWidthEl = 1,\r\n            drawingShadowWidth = 0,\r\n            drawingShadowOffset = 0,\r\n            clearEl = $(\'clear-canvas\'),\r\n            clearEl2 = $(\'clear-canvas2\');\r\n\r\n        clearEl.onclick = function() { canvas.clear() };\r\n        clearEl2.onclick = function() { canvas2.clear() };\r\n\r\n        if (canvas.freeDrawingBrush) {\r\n            canvas.freeDrawingBrush.color = \'#333\';\r\n            canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);\r\n            canvas.freeDrawingBrush.width = 1;\r\n            canvas.freeDrawingBrush.shadow = new fabric.Shadow({\r\n            blur: 0,\r\n            offsetX: 0,\r\n            offsetY: 0,\r\n            affectStroke: true,\r\n            color: \'#fff\',\r\n            });\r\n        }\r\n        if (canvas2.freeDrawingBrush) {\r\n            canvas2.freeDrawingBrush.color = \'#333\';\r\n            canvas2.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc.call(this);\r\n            canvas2.freeDrawingBrush.width = 1;\r\n            canvas2.freeDrawingBrush.shadow = new fabric.Shadow({\r\n            blur: 0,\r\n            offsetX: 0,\r\n            offsetY: 0,\r\n            affectStroke: true,\r\n            color: \'#fff\',\r\n            });\r\n        }\r\n        })();\r\n    </script>\r\n</html>', NULL, '/images/templates/proposals/template3.png'),
(16, '9999-01-01 00:00:00', 'none', 'testing new template', 'Template', '/templates/proposals/proposal_template_9999-01-01.html', 'test,proposal', '<h1>Testing new template<br data-mce-bogus=\"1\"></h1><p>Testing saving a new template<br data-mce-bogus=\"1\"></p>', NULL, '/uploads/invoices-original.jpg'),
(17, '2021-06-14 20:24:22', '', 'Abc', 'Final Version', '/uploads/proposals/proposal_2021-06-14T20:24:22.964Z.html', 'abc', '<h1>Testing<br data-mce-bogus=\"1\"></h1><p>Test<br data-mce-bogus=\"1\"></p>', NULL, '/uploads/leads.jpg'),
(18, '2021-06-14 20:38:39', '', 'It should work!', 'Final Version', '/uploads/proposals/Proposal 1623703119906.html', 'abc,test,working', '<h1>Testing<br data-mce-bogus=\"1\"></h1><p>new last test<br data-mce-bogus=\"1\"></p>', NULL, '/uploads/leads.jpg'),
(19, '2021-06-14 21:31:34', '', 'Testing a new proposal', 'Draft', '/uploads/proposals/Proposal 1623706294760.html', 'testing,new,proposal', '<h1>Testing new proposal<br data-mce-bogus=\"1\"></h1><p>TESTING THE RETURN OF THE PROPOSAL<br data-mce-bogus=\"1\"></p>', NULL, '/uploads/example.jpg'),
(20, '2021-06-14 21:41:52', '', 'Proposal test', 'Draft', '/uploads/proposals/Proposal 1623706912498.html', 'abc,test', '<h1>Testing leads in new proposal<br data-mce-bogus=\"1\"></h1><p>TEST<br data-mce-bogus=\"1\"></p>', NULL, '/uploads/invoices-original.jpg'),
(21, '2021-06-14 21:52:03', '8|University Outdoor event 3 days', 'New proposal for a specific lead', 'Final Version', '/uploads/proposals/Proposal 1623707523046.html', 'abc,lead,test', '<h1>Testing new proposal with leads<br data-mce-bogus=\"1\"></h1><p>Testing the saving of leads for proposals<br data-mce-bogus=\"1\"></p>', NULL, '/uploads/example.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `system_users`
--

CREATE TABLE `system_users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `user` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `email` varchar(250) COLLATE utf8mb4_bin NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `system_users`
--

INSERT INTO `system_users` (`id`, `fullname`, `user`, `password`, `active`, `email`, `phone`, `related_to`) VALUES
(1, 'Testing User 2021', 'testing', '$2a$12$ES7YsVyofFA.q12tTBCFguuHlO20ZBUfQDI8s3ytC7F5.AHQjLAiq', 1, 'testing@something.test', '122193093', NULL),
(2, 'Another Testing User', 'myuser', '$2a$12$BZWYyjcKLvVwzhpOw8jKX.oM6qdniTSWnBZMwrq/Xb1JnQ3EhJy5e', 1, 'something@totest.email.com', '12009123990123', NULL),
(3, 'Emilsaaa', 'emilu', '$2a$12$o3F0BLdyqpTZPjQqYS0/uORq9Pokj64Tl00x7VKHmedAuuyi/la3K', 1, 'emilllll@test.test', '298382893', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `taxes`
--

CREATE TABLE `taxes` (
  `id` int(11) NOT NULL,
  `percentage` double NOT NULL,
  `description` text COLLATE utf8mb4_bin NOT NULL,
  `status` tinyint(1) NOT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `taxes`
--

INSERT INTO `taxes` (`id`, `percentage`, `description`, `status`, `related_to`) VALUES
(3, 5.1, 'Tax for water1', 1, '{raza: mouse}'),
(4, 9.3, 'Laughter and noise', 0, '{raza: mouse}'),
(5, 9.8, 'Tax for the air', 1, 'NULL'),
(6, 8.9, 'Something', 0, 'NULL'),
(8, 7.4, 'Yummi food!!', 1, 'NULL'),
(10, 8.7, 'Waking up very early!', 1, 'NULL'),
(11, 8.7, 'Nice and beautiful paintings!', 1, 'NULL'),
(12, 5, 'Precious Day!', 1, 'NULL'),
(13, 3.4, 'desc edited', 1, 'NULL'),
(14, 3.4, 'desc2', 1, 'NULL'),
(15, 3.5, 'desc2', 1, 'NULL'),
(16, 1.1, 'Testing Edit Tax', 1, 'NULL');

-- --------------------------------------------------------

--
-- Table structure for table `to-do`
--

CREATE TABLE `to-do` (
  `id` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `details` text COLLATE utf8mb4_bin NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_for_completion` date NOT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `to-do`
--

INSERT INTO `to-do` (`id`, `created`, `details`, `status`, `date_for_completion`, `related_to`) VALUES
(1, '2021-04-13 11:44:27', 'Must check pending invoices', 0, '2021-04-12', NULL),
(2, '2021-04-13 11:45:03', 'A lead is awaiting a call about tomorrow\'s event', 0, '2021-04-12', NULL),
(3, '2021-04-13 11:45:23', 'Confirm today\'s availability for venue 10', 0, '2021-04-12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `venues`
--

CREATE TABLE `venues` (
  `id` int(11) NOT NULL,
  `venue` varchar(250) COLLATE utf8mb4_bin NOT NULL,
  `description` text COLLATE utf8mb4_bin NOT NULL,
  `status` tinyint(1) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `related_to` longtext COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `venues`
--

INSERT INTO `venues` (`id`, `venue`, `description`, `status`, `image`, `related_to`) VALUES
(3, 'Some Venue', 'Some description', 1, '/images/example.jpg', NULL),
(4, 'Some new venue ABC', 'Something here', 0, '/images/example.jpg', NULL),
(5, 'Abc', 'Description of Abc', 1, '/images/example.jpg', NULL),
(9, 'venue', 'desc', 0, '/images/example.jpg', NULL),
(10, 'Test!!', 'Some test', 0, '/uploads/Untitled1.png', NULL),
(11, 'Testing again!03', 'Testing the venue image', 0, '/images/Screenshot_4.png', NULL),
(12, 'Testing again the quotes', 'Testing!!!', 1, '/images/Screenshot_2.png', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `calendar_contacts`
--
ALTER TABLE `calendar_contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `calendar_leads`
--
ALTER TABLE `calendar_leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contracts`
--
ALTER TABLE `contracts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_contact`
--
ALTER TABLE `invoice_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_lead`
--
ALTER TABLE `invoice_lead`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads_contacts`
--
ALTER TABLE `leads_contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads_history`
--
ALTER TABLE `leads_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead_contacts`
--
ALTER TABLE `lead_contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead_messages`
--
ALTER TABLE `lead_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead_notes`
--
ALTER TABLE `lead_notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead_proposal`
--
ALTER TABLE `lead_proposal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lead_users`
--
ALTER TABLE `lead_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message_contacts`
--
ALTER TABLE `message_contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proposals`
--
ALTER TABLE `proposals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system_users`
--
ALTER TABLE `system_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taxes`
--
ALTER TABLE `taxes`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `to-do`
--
ALTER TABLE `to-do`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `venues`
--
ALTER TABLE `venues`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `calendar_contacts`
--
ALTER TABLE `calendar_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `calendar_leads`
--
ALTER TABLE `calendar_leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contracts`
--
ALTER TABLE `contracts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `invoice_contact`
--
ALTER TABLE `invoice_contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `invoice_lead`
--
ALTER TABLE `invoice_lead`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `leads_contacts`
--
ALTER TABLE `leads_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `leads_history`
--
ALTER TABLE `leads_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lead_contacts`
--
ALTER TABLE `lead_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `lead_messages`
--
ALTER TABLE `lead_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `lead_notes`
--
ALTER TABLE `lead_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lead_proposal`
--
ALTER TABLE `lead_proposal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lead_users`
--
ALTER TABLE `lead_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `message_contacts`
--
ALTER TABLE `message_contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `proposals`
--
ALTER TABLE `proposals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `system_users`
--
ALTER TABLE `system_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `taxes`
--
ALTER TABLE `taxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `to-do`
--
ALTER TABLE `to-do`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `venues`
--
ALTER TABLE `venues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
